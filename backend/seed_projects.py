"""Idempotent project seeder for existing MongoDB deployments.

The app's automatic seeding (in server.py) only runs when the `projects`
collection is EMPTY. If your database already has projects, run this script
once to upsert the real client projects without creating duplicates.

Usage:
    cd backend
    # make sure MONGO_URL / DB_NAME are set (or in backend/.env)
    python seed_projects.py

Matching is done on (client_name, title), so re-running just updates the
existing entries in place. Existing projects that aren't in this list are
left untouched.
"""

import asyncio
import os
import uuid
from datetime import datetime, timezone

from motor.motor_asyncio import AsyncIOMotorClient

try:
    from dotenv import load_dotenv

    load_dotenv()
except Exception:
    pass

# Import the canonical list from the server so this stays in sync.
from server import SEED_PROJECTS  # noqa: E402

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "agastya_studios")


async def main():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    now = datetime.now(timezone.utc).isoformat()

    added, updated = 0, 0
    for p in SEED_PROJECTS:
        query = {"title": p["title"], "client_name": p.get("client_name")}
        existing = await db.projects.find_one(query, {"_id": 0, "id": 1})
        if existing:
            await db.projects.update_one(query, {"$set": {**p}})
            updated += 1
        else:
            await db.projects.insert_one({"id": str(uuid.uuid4()), "created_at": now, **p})
            added += 1

    total = await db.projects.count_documents({})
    print(f"Done. Added {added}, updated {updated}. Projects in DB: {total}")
    client.close()


if __name__ == "__main__":
    asyncio.run(main())
