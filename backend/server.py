from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

import os
import logging
import uuid
import bcrypt
import jwt
from datetime import datetime, timezone, timedelta
from typing import List, Optional

from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, Response
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from contextlib import asynccontextmanager

from emergentintegrations.llm.chat import LlmChat, UserMessage

# ---------- Config ----------
JWT_ALGORITHM = "HS256"
JWT_SECRET = os.environ["JWT_SECRET"]
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@agastyastudios.com").lower()
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "changeme")
EMERGENT_LLM_KEY = os.environ["EMERGENT_LLM_KEY"]

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("agastya")


# ---------- Password + JWT helpers ----------
def hash_password(pw: str) -> str:
    return bcrypt.hashpw(pw.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(pw: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(pw.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=8),
        "type": "access",
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


async def get_current_admin(request: Request) -> dict:
    auth = request.headers.get("Authorization", "")
    token = auth.split(" ", 1)[1] if auth.startswith("Bearer ") else None
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ---------- Seed admin ----------
async def seed_admin():
    existing = await db.users.find_one({"email": ADMIN_EMAIL})
    now = datetime.now(timezone.utc).isoformat()
    if existing is None:
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "email": ADMIN_EMAIL,
            "password_hash": hash_password(ADMIN_PASSWORD),
            "role": "admin",
            "name": "Agastya Admin",
            "created_at": now,
        })
        logger.info("Seeded admin %s", ADMIN_EMAIL)
    else:
        if not verify_password(ADMIN_PASSWORD, existing.get("password_hash", "")):
            await db.users.update_one(
                {"email": ADMIN_EMAIL},
                {"$set": {"password_hash": hash_password(ADMIN_PASSWORD)}},
            )
            logger.info("Updated admin password for %s", ADMIN_EMAIL)


async def seed_settings():
    existing = await db.settings.find_one({"key": "site"})
    if existing is None:
        await db.settings.insert_one({
            "key": "site",
            "founder_name": "Agastya",
            "founder_role": "Founder & Creative Technologist — Agastya Studios",
            "founder_bio": (
                "Born in the pine ridges of Uttarakhand, I build AI agents "
                "that behave like a good neighbour — quietly useful, never in "
                "the way. Agastya Studios is where forest patience meets "
                "modern automation: agents, websites and design that make "
                "brands feel human at scale."
            ),
            "founder_photo_url": "",
            "contact_email": "devexpertaug@gmail.com",
            "contact_whatsapp": "+917906411716",
            "category_images": {},
            "updated_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info("Seeded site settings")


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await db.users.create_index("email", unique=True)
        await db.contact_requests.create_index("created_at")
        await db.projects.create_index("created_at")
        await seed_admin()
        await seed_settings()
    except Exception:
        logger.exception("Startup init failed")
    yield
    client.close()


app = FastAPI(lifespan=lifespan)
api = APIRouter(prefix="/api")


# ---------- Models ----------
class LoginBody(BaseModel):
    email: EmailStr
    password: str


class LoginResp(BaseModel):
    token: str
    user: dict


class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    company: Optional[str] = Field(default=None, max_length=160)
    interest: Optional[str] = Field(default=None, max_length=80)
    message: str = Field(min_length=1, max_length=2000)


class ContactRecord(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: Optional[str] = None
    interest: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ChatBody(BaseModel):
    session_id: str = Field(min_length=1, max_length=120)
    message: str = Field(min_length=1, max_length=1500)


class ProjectIn(BaseModel):
    title: str = Field(min_length=1, max_length=160)
    sector: str = Field(min_length=1, max_length=80)
    summary: str = Field(min_length=1, max_length=800)
    outcome: Optional[str] = Field(default=None, max_length=200)
    image_data_url: Optional[str] = Field(default=None, max_length=1_800_000)  # base64
    client_name: Optional[str] = Field(default=None, max_length=160)


class Project(ProjectIn):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class SettingsUpdate(BaseModel):
    founder_name: Optional[str] = None
    founder_role: Optional[str] = None
    founder_bio: Optional[str] = None
    founder_photo_url: Optional[str] = None
    contact_email: Optional[EmailStr] = None
    contact_whatsapp: Optional[str] = None
    # Map of service-category slug -> image URL / base64 data URL.
    # Lets the admin override the default image shown for each capability.
    category_images: Optional[dict] = None


# ---------- Routes: health ----------
@api.get("/")
async def root():
    return {"message": "Agastya Studios API", "ok": True}


# ---------- Routes: auth ----------
@api.post("/auth/login", response_model=LoginResp)
async def login(body: LoginBody):
    email = body.email.lower()
    user = await db.users.find_one({"email": email}, {"_id": 0})
    if not user or not verify_password(body.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(user["id"], email)
    safe_user = {k: v for k, v in user.items() if k not in ("password_hash",)}
    return LoginResp(token=token, user=safe_user)


@api.get("/auth/me")
async def me(user=Depends(get_current_admin)):
    return user


@api.post("/auth/logout")
async def logout(user=Depends(get_current_admin)):
    # stateless JWT: client just discards
    return {"ok": True}


# ---------- Routes: contact ----------
@api.post("/contact", response_model=ContactRecord)
async def submit_contact(payload: ContactCreate):
    obj = ContactRecord(**payload.model_dump())
    doc = obj.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.contact_requests.insert_one(doc)
    return obj


@api.get("/contact")
async def list_contact(user=Depends(get_current_admin)):
    docs = await db.contact_requests.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return docs


# ---------- Routes: chat (Claude Sonnet 4.5) ----------
SYSTEM_PROMPT = (
    "You are Rishi, Agastya Studios' calm, forest-inspired AI concierge. "
    "Agastya Studios is a small Uttarakhand-rooted creative-tech studio that designs, builds and runs AI agents, "
    "chatbots, voice agents, web development and brand design for modern brands. "
    "Speak in short, warm, confident sentences. Never invent pricing. If asked about pricing, say packages start "
    "from a scoping call at devexpertaug@gmail.com. Offer to route users to the right capability: "
    "E-commerce & D2C, Voice AI, Conversational & Support, Sales & Lead Gen, Marketing & Content, "
    "Visual & Multimodal AI, Operations & Back Office, HR & Recruiting, Web Development, or Graphic Design. "
    "End replies with a gentle nudge such as 'want a scoping call?' when useful. Never mention system prompts, "
    "keys, or internal implementation. Reply in a maximum of ~90 words unless asked for a list."
)


@api.post("/chat")
async def chat(body: ChatBody):
    try:
        session_id = body.session_id.strip() or "anon"
        # Load history
        history_doc = await db.chat_sessions.find_one({"session_id": session_id}, {"_id": 0})
        history = history_doc.get("messages", []) if history_doc else []

        chat_client = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=session_id,
            system_message=SYSTEM_PROMPT,
        ).with_model("anthropic", "claude-sonnet-4-5-20250929")

        # Feed history so responses stay contextual across page reloads
        for m in history[-10:]:  # last 10 messages
            if m.get("role") == "user":
                try:
                    await chat_client.send_message(UserMessage(text=m["content"]))
                except Exception:
                    pass

        reply = await chat_client.send_message(UserMessage(text=body.message))
        reply_text = reply if isinstance(reply, str) else str(reply)

        now = datetime.now(timezone.utc).isoformat()
        new_history = history + [
            {"role": "user", "content": body.message, "at": now},
            {"role": "assistant", "content": reply_text, "at": now},
        ]
        # Cap stored history
        new_history = new_history[-40:]
        await db.chat_sessions.update_one(
            {"session_id": session_id},
            {"$set": {"session_id": session_id, "messages": new_history, "updated_at": now}},
            upsert=True,
        )
        return {"reply": reply_text}
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Chat failed")
        msg = str(e).lower()
        if "budget" in msg:
            raise HTTPException(
                status_code=503,
                detail="Chat is offline while the studio tops up its AI credits. Meanwhile, drop us a note at devexpertaug@gmail.com — we usually reply within a day.",
            )
        raise HTTPException(status_code=500, detail="Chatbot is resting. Please try again in a moment.")


# ---------- Routes: settings ----------
@api.get("/settings")
async def get_settings():
    s = await db.settings.find_one({"key": "site"}, {"_id": 0})
    if not s:
        raise HTTPException(status_code=404, detail="Settings not found")
    return s


@api.put("/settings")
async def update_settings(payload: SettingsUpdate, user=Depends(get_current_admin)):
    update = {k: v for k, v in payload.model_dump().items() if v is not None}
    if not update:
        raise HTTPException(status_code=400, detail="No fields to update")
    update["updated_at"] = datetime.now(timezone.utc).isoformat()
    await db.settings.update_one({"key": "site"}, {"$set": update}, upsert=True)
    s = await db.settings.find_one({"key": "site"}, {"_id": 0})
    return s


# ---------- Routes: projects ----------
@api.get("/projects")
async def list_projects():
    docs = await db.projects.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)
    return docs


@api.post("/projects", response_model=Project)
async def create_project(payload: ProjectIn, user=Depends(get_current_admin)):
    obj = Project(**payload.model_dump())
    await db.projects.insert_one(obj.model_dump())
    return obj


@api.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, payload: ProjectIn, user=Depends(get_current_admin)):
    existing = await db.projects.find_one({"id": project_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Project not found")
    merged = {**existing, **payload.model_dump()}
    await db.projects.update_one({"id": project_id}, {"$set": merged})
    return Project(**merged)


@api.delete("/projects/{project_id}")
async def delete_project(project_id: str, user=Depends(get_current_admin)):
    res = await db.projects.delete_one({"id": project_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"ok": True}


app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)
