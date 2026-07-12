"""Backend API tests for Aug Studios (Lithos) site."""
import os
import uuid

import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    # Fallback: read from /app/frontend/.env
    env_path = "/app/frontend/.env"
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.strip().split("=", 1)[1]
                    break

assert BASE_URL, "REACT_APP_BACKEND_URL must be set"
BASE_URL = BASE_URL.rstrip("/")
API = f"{BASE_URL}/api"


# ---------- Root ----------
class TestRoot:
    def test_root_returns_aug_studios_message(self):
        r = requests.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert "Aug Studios" in data["message"]


# ---------- Contact POST ----------
class TestContactCreate:
    def test_contact_post_valid_minimal(self):
        payload = {
            "name": f"TEST_User_{uuid.uuid4().hex[:6]}",
            "email": f"test_{uuid.uuid4().hex[:6]}@example.com",
            "message": "Hello, this is a test message.",
        }
        r = requests.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "created_at" in data
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]
        # MongoDB _id should not leak
        assert "_id" not in data

    def test_contact_post_valid_full(self):
        payload = {
            "name": f"TEST_User_{uuid.uuid4().hex[:6]}",
            "email": f"test_{uuid.uuid4().hex[:6]}@example.com",
            "company": "TEST Aug Studios",
            "interest": "Voice AI",
            "message": "I need a voice AI agent.",
        }
        r = requests.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["company"] == payload["company"]
        assert data["interest"] == payload["interest"]

    def test_contact_post_invalid_email(self):
        payload = {
            "name": "TEST_bademail",
            "email": "not-an-email",
            "message": "hi",
        }
        r = requests.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422

    def test_contact_post_missing_name(self):
        payload = {"email": "test@example.com", "message": "hi"}
        r = requests.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422

    def test_contact_post_missing_email(self):
        payload = {"name": "TEST_x", "message": "hi"}
        r = requests.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422

    def test_contact_post_missing_message(self):
        payload = {"name": "TEST_x", "email": "test@example.com"}
        r = requests.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422

    def test_contact_post_empty_name(self):
        payload = {"name": "", "email": "test@example.com", "message": "hi"}
        r = requests.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422


# ---------- Contact GET ----------
class TestContactList:
    def test_contact_list_includes_newly_submitted(self):
        # Create a unique record
        unique_name = f"TEST_ListVerify_{uuid.uuid4().hex[:8]}"
        payload = {
            "name": unique_name,
            "email": f"listverify_{uuid.uuid4().hex[:6]}@example.com",
            "message": "verify list includes this",
        }
        create_r = requests.post(f"{API}/contact", json=payload, timeout=15)
        assert create_r.status_code == 200
        created_id = create_r.json()["id"]

        # List all
        list_r = requests.get(f"{API}/contact", timeout=15)
        assert list_r.status_code == 200
        items = list_r.json()
        assert isinstance(items, list)
        # Find our record
        found = next((it for it in items if it.get("id") == created_id), None)
        assert found is not None, f"Newly created contact {created_id} not found in list"
        assert found["name"] == unique_name
        # _id should not leak
        for it in items:
            assert "_id" not in it


# ---------- Status endpoints (existing) ----------
class TestStatus:
    def test_status_post_and_get(self):
        client_name = f"TEST_status_{uuid.uuid4().hex[:6]}"
        r = requests.post(f"{API}/status", json={"client_name": client_name}, timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data["client_name"] == client_name
        assert "id" in data

        r2 = requests.get(f"{API}/status", timeout=15)
        assert r2.status_code == 200
        items = r2.json()
        assert any(it["client_name"] == client_name for it in items)
