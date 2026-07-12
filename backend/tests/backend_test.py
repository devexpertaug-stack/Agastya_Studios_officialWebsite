"""Backend API tests for Agastya Studios (rebrand of Lithos).

Covers:
- Health (GET /api/)
- Auth (POST /api/auth/login, GET /api/auth/me)
- Public settings (GET /api/settings) + admin update (PUT /api/settings)
- Projects CRUD (list public / create / update / delete auth)
- Contact submission (POST /api/contact)
- Chat degraded 503 (Emergent LLM key at $0 budget)
"""
import os
import uuid

import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
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

ADMIN_EMAIL = "admin@agastyastudios.com"
ADMIN_PASSWORD = "agastya-forest-2026"


# ---------------- Health ----------------
class TestRoot:
    def test_root_returns_agastya_message(self):
        r = requests.get(f"{API}/", timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("message") == "Agastya Studios API"
        assert data.get("ok") is True


# ---------------- Auth ----------------
@pytest.fixture(scope="module")
def admin_token():
    r = requests.post(
        f"{API}/auth/login",
        json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
        timeout=15,
    )
    assert r.status_code == 200, r.text
    return r.json()["token"]


@pytest.fixture(scope="module")
def auth_headers(admin_token):
    return {"Authorization": f"Bearer {admin_token}"}


class TestAuth:
    def test_login_success_returns_token_and_user(self):
        r = requests.post(
            f"{API}/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
            timeout=15,
        )
        assert r.status_code == 200, r.text
        data = r.json()
        assert isinstance(data.get("token"), str) and len(data["token"]) > 20
        user = data["user"]
        assert user["email"] == ADMIN_EMAIL
        assert user.get("role") == "admin"
        assert "password_hash" not in user
        assert "_id" not in user

    def test_login_wrong_password_401(self):
        r = requests.post(
            f"{API}/auth/login",
            json={"email": ADMIN_EMAIL, "password": "wrong-password"},
            timeout=15,
        )
        assert r.status_code == 401

    def test_login_invalid_email_422(self):
        r = requests.post(
            f"{API}/auth/login",
            json={"email": "not-an-email", "password": "anything"},
            timeout=15,
        )
        assert r.status_code == 422

    def test_me_with_token_returns_admin(self, auth_headers):
        r = requests.get(f"{API}/auth/me", headers=auth_headers, timeout=15)
        assert r.status_code == 200, r.text
        u = r.json()
        assert u["email"] == ADMIN_EMAIL
        assert u.get("role") == "admin"
        assert "password_hash" not in u
        assert "_id" not in u

    def test_me_without_token_401(self):
        r = requests.get(f"{API}/auth/me", timeout=15)
        assert r.status_code == 401

    def test_me_bad_token_401(self):
        r = requests.get(
            f"{API}/auth/me",
            headers={"Authorization": "Bearer bogus.token.here"},
            timeout=15,
        )
        assert r.status_code == 401


# ---------------- Settings ----------------
class TestSettings:
    def test_public_get_settings_has_expected_fields(self):
        r = requests.get(f"{API}/settings", timeout=15)
        assert r.status_code == 200, r.text
        s = r.json()
        for key in (
            "founder_name",
            "founder_role",
            "founder_bio",
            "contact_email",
            "contact_whatsapp",
        ):
            assert key in s, f"missing {key} in settings"
        assert "_id" not in s

    def test_put_settings_requires_auth(self):
        r = requests.put(
            f"{API}/settings",
            json={"founder_name": "should-not-apply"},
            timeout=15,
        )
        assert r.status_code == 401

    def test_put_settings_updates_founder_name(self, auth_headers):
        # Capture original to restore afterwards
        original = requests.get(f"{API}/settings", timeout=15).json()
        original_name = original.get("founder_name")

        new_name = f"TEST Agastya {uuid.uuid4().hex[:6]}"
        r = requests.put(
            f"{API}/settings",
            json={"founder_name": new_name},
            headers=auth_headers,
            timeout=15,
        )
        assert r.status_code == 200, r.text
        s = r.json()
        assert s["founder_name"] == new_name

        # Verify via public GET
        r2 = requests.get(f"{API}/settings", timeout=15)
        assert r2.json()["founder_name"] == new_name

        # Restore
        requests.put(
            f"{API}/settings",
            json={"founder_name": original_name},
            headers=auth_headers,
            timeout=15,
        )


# ---------------- Projects CRUD ----------------
class TestProjects:
    def test_public_list_projects_returns_array(self):
        r = requests.get(f"{API}/projects", timeout=15)
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_create_requires_auth(self):
        r = requests.post(
            f"{API}/projects",
            json={"title": "x", "sector": "y", "summary": "z"},
            timeout=15,
        )
        assert r.status_code == 401

    def test_full_project_lifecycle(self, auth_headers):
        title = f"TEST Project {uuid.uuid4().hex[:8]}"
        create_payload = {
            "title": title,
            "sector": "Voice AI",
            "summary": "TEST summary for automated testing",
            "client_name": "TEST_Client",
        }
        cr = requests.post(
            f"{API}/projects", json=create_payload, headers=auth_headers, timeout=15
        )
        assert cr.status_code == 200, cr.text
        created = cr.json()
        assert created["title"] == title
        assert created["sector"] == "Voice AI"
        assert "id" in created and isinstance(created["id"], str)
        assert "_id" not in created
        pid = created["id"]

        # GET public should include it
        list_r = requests.get(f"{API}/projects", timeout=15)
        assert list_r.status_code == 200
        got = next((p for p in list_r.json() if p.get("id") == pid), None)
        assert got is not None, "created project not found in list"
        assert got["title"] == title
        assert "_id" not in got

        # UPDATE
        new_summary = "TEST updated summary"
        ur = requests.put(
            f"{API}/projects/{pid}",
            json={**create_payload, "summary": new_summary},
            headers=auth_headers,
            timeout=15,
        )
        assert ur.status_code == 200, ur.text
        assert ur.json()["summary"] == new_summary

        # verify via GET list
        after = requests.get(f"{API}/projects", timeout=15).json()
        got2 = next((p for p in after if p.get("id") == pid), None)
        assert got2 and got2["summary"] == new_summary

        # DELETE
        dr = requests.delete(f"{API}/projects/{pid}", headers=auth_headers, timeout=15)
        assert dr.status_code == 200

        # verify removed
        after2 = requests.get(f"{API}/projects", timeout=15).json()
        assert not any(p.get("id") == pid for p in after2)

        # second delete returns 404
        dr2 = requests.delete(f"{API}/projects/{pid}", headers=auth_headers, timeout=15)
        assert dr2.status_code == 404


# ---------------- Contact ----------------
class TestContact:
    def test_contact_valid(self):
        payload = {
            "name": f"TEST_User_{uuid.uuid4().hex[:6]}",
            "email": f"test_{uuid.uuid4().hex[:6]}@example.com",
            "company": "TEST",
            "interest": "Voice AI",
            "message": "Hello Agastya!",
        }
        r = requests.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["email"] == payload["email"]
        assert "_id" not in data

    def test_contact_invalid_email_422(self):
        r = requests.post(
            f"{API}/contact",
            json={"name": "x", "email": "not-an-email", "message": "hi"},
            timeout=15,
        )
        assert r.status_code == 422


# ---------------- Seed projects (6 auto-seeded) + GET by id ----------------
class TestSeedProjectsAndGetById:
    def test_seed_projects_exist(self):
        r = requests.get(f"{API}/projects", timeout=15)
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        # Exclude any TEST_ prefixed test-created projects
        non_test = [p for p in items if not str(p.get("title", "")).startswith("TEST")]
        assert len(non_test) >= 6, f"expected >=6 seed projects, got {len(non_test)}"
        expected_titles = {
            "Alpine Apparel — cart recovery agent",
            "Rawat Wellness — 24/7 receptionist",
            "Ridge & Route — trilingual live chat",
            "Deodar Cloud — pipeline agent stack",
            "Meraki Retreats — a booking site people bookmark",
            "Sanjhi — a wellness brand that feels like a forest",
        }
        titles = {p.get("title") for p in non_test}
        missing = expected_titles - titles
        assert not missing, f"missing seed projects: {missing}"
        # Verify shape
        for p in non_test:
            if p.get("title") in expected_titles:
                for key in ("id", "title", "sector", "summary", "description", "outcome", "client_name", "image_data_url"):
                    assert key in p and p[key], f"seed project '{p.get('title')}' missing/empty '{key}'"

    def test_get_project_by_id_success(self):
        items = requests.get(f"{API}/projects", timeout=15).json()
        pid = items[0]["id"]
        r = requests.get(f"{API}/projects/{pid}", timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["id"] == pid
        assert "_id" not in data

    def test_get_project_by_id_404(self):
        r = requests.get(f"{API}/projects/does-not-exist-xyz", timeout=15)
        assert r.status_code == 404


# ---------------- Service Content Overrides ----------------
class TestServiceContent:
    SLUG = "ecommerce"

    def test_public_get_service_content_dict(self):
        r = requests.get(f"{API}/service-content", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, dict)

    def test_get_slug_empty_returns_slug_only(self):
        # unique slug so it stays "empty"
        slug = f"nonexistent-slug-{uuid.uuid4().hex[:6]}"
        r = requests.get(f"{API}/service-content/{slug}", timeout=15)
        assert r.status_code == 200
        assert r.json() == {"slug": slug}

    def test_get_slug_layer_reveal_1_returns_slug_when_empty(self):
        # First reset (in case previous run left it)
        r = requests.get(f"{API}/service-content/layer-reveal-1", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data.get("slug") == "layer-reveal-1"

    def test_put_service_content_requires_auth(self):
        r = requests.put(
            f"{API}/service-content/{self.SLUG}",
            json={"title": "should-not-apply"},
            timeout=15,
        )
        assert r.status_code == 401

    def test_full_service_content_lifecycle(self, auth_headers):
        slug = self.SLUG
        payload = {
            "title": f"TEST override title {uuid.uuid4().hex[:6]}",
            "blurb": "TEST override blurb",
            "features": ["x", "y"],
        }
        # PUT
        r = requests.put(
            f"{API}/service-content/{slug}",
            json=payload,
            headers=auth_headers,
            timeout=15,
        )
        assert r.status_code == 200, r.text
        saved = r.json()
        assert saved["slug"] == slug
        assert saved["title"] == payload["title"]
        assert saved["blurb"] == payload["blurb"]
        assert saved["features"] == payload["features"]
        assert "_id" not in saved

        # GET slug reflects override
        r2 = requests.get(f"{API}/service-content/{slug}", timeout=15)
        assert r2.status_code == 200
        assert r2.json()["title"] == payload["title"]

        # Public dict includes override
        r3 = requests.get(f"{API}/service-content", timeout=15)
        assert r3.status_code == 200
        dct = r3.json()
        assert slug in dct
        assert dct[slug]["title"] == payload["title"]

        # DELETE resets
        r4 = requests.delete(
            f"{API}/service-content/{slug}", headers=auth_headers, timeout=15
        )
        assert r4.status_code == 200

        # GET after reset — empty (just slug)
        r5 = requests.get(f"{API}/service-content/{slug}", timeout=15)
        assert r5.status_code == 200
        data5 = r5.json()
        assert data5.get("slug") == slug
        # title should be gone
        assert "title" not in data5 or data5.get("title") is None

    def test_delete_requires_auth(self):
        r = requests.delete(f"{API}/service-content/anything", timeout=15)
        assert r.status_code == 401


# ---------------- Chat (graceful 503 when budget is 0) ----------------
class TestChat:
    def test_chat_returns_503_or_200_never_500(self):
        r = requests.post(
            f"{API}/chat",
            json={"session_id": f"TEST_sess_{uuid.uuid4().hex[:6]}", "message": "hi"},
            timeout=30,
        )
        # Per review: Emergent key has 0 budget -> 503 with friendly detail.
        # Accept 200 (if credits are restored) or 503 (expected). Never 500.
        assert r.status_code in (200, 503), f"unexpected status {r.status_code}: {r.text}"
        if r.status_code == 503:
            detail = r.json().get("detail", "")
            assert isinstance(detail, str) and len(detail) > 0
            assert "chat" in detail.lower() or "credit" in detail.lower() or "offline" in detail.lower()
