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

import llm

# ---------- Config ----------
JWT_ALGORITHM = "HS256"
# Sensible self-host defaults so the app runs on plain MongoDB without Emergent.
JWT_SECRET = os.environ.get("JWT_SECRET", "dev-insecure-change-me")
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@agastyastudios.com").lower()
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "changeme")

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "agastya_studios")

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
            "updated_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info("Seeded site settings")


SEED_PROJECTS = [
    {
        "title": "KK LEE — a home for handcrafted leather",
        "sector": "E-commerce & D2C",
        "summary": "A quiet, editorial storefront for a made-to-order leather footwear house — built to let the craft speak.",
        "outcome": "Live at kklee.in",
        "client_name": "KK LEE",
        "description": (
            "KK LEE is a leather-goods house that makes footwear and accessories slowly, in small batches, one pair "
            "at a time. They wanted a website that felt like the workshop the shoes come from — unhurried, tactile "
            "and confident, never shouty. We designed and built an editorial storefront that leads with the craft: a "
            "made-to-order journey, the 'Crafted for Him' and 'Crafted for Her' collections, and a short journal on "
            "materials and making. The layout leaves plenty of room to breathe so the product photography carries the "
            "story, and the path to buying stays simple enough that choosing a pair feels as considered as making one."
        ),
        "image_data_url": "https://static.wixstatic.com/media/d2d0db_20c0eb8601a743a19f529ed7b32af660~mv2.jpeg/v1/fill/w_1200,h_1600,al_c,q_85/kklee.jpeg",
    },
    {
        "title": "Maruti Complete Eye Care — Dehradun",
        "sector": "Web Development",
        "summary": "A warm, trustworthy clinic site for a Dehradun eye-care practice specialising in children's vision.",
        "outcome": "Live at maruticompleteeyecare.com",
        "client_name": "Dr. Swati Uniyal, Dehradun",
        "description": (
            "Maruti Complete Eye Care is a Dehradun practice led by Dr. Swati Uniyal, focused on pediatric eye care, "
            "vision therapy and neuro-vision rehabilitation. Parents usually arrive worried, so the brief was "
            "reassurance first: plain-language explanations of each therapy, an approachable tone, and an obvious way "
            "to get in touch and book a visit. We designed and built a calm, mobile-first site that puts the doctor "
            "and her services front and centre, so a first-time visitor quickly understands what's offered and feels "
            "comfortable reaching out. A home-turf project too — the clinic is a short drive from the studio."
        ),
        "image_data_url": "https://maruticompleteeyecare.com/DoctorSwati.jpeg",
    },
    {
        "title": "Mimaansa — ethical sourcing, told honestly",
        "sector": "Web Development",
        "summary": "A B2B site for an India-based ethical sourcing and export partner working with global brands.",
        "outcome": "Live at mimaansa.com",
        "client_name": "Mimaansa",
        "description": (
            "Mimaansa is an India-based sourcing agency and export partner for apparel, home furnishings, fabrics and "
            "lifestyle accessories, helping overseas brands and retailers manufacture in India with confidence. The "
            "site had to earn trust from buyers who have never met the team, so we built the whole experience around "
            "credibility: a clear walk-through of their five-step sourcing process, the full set of services — "
            "product sourcing, development, negotiation and pricing, order management and quality control — and the "
            "ethics that sit underneath it. The result reads like 'your on-ground team in India': professional, "
            "transparent, and easy to enquire through."
        ),
        "image_data_url": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1600&q=85&auto=format&fit=crop",
    },
    {
        "title": "Saluja Realtors — property, without the noise",
        "sector": "Web Development",
        "summary": "A clean brokerage site that turns property browsing into simple, direct enquiries.",
        "outcome": "Real-estate brokerage site",
        "client_name": "Saluja Realtors",
        "description": (
            "Saluja Realtors is a property brokerage that needed a website to match how they actually work — "
            "personal, responsive and no-nonsense. We designed and built a straightforward site that presents "
            "listings clearly, makes it effortless for a buyer or seller to enquire, and behaves well on a phone, "
            "where most property browsing really happens. No stock-photo clutter, no dead-end forms — just a credible "
            "online front door that lets the team spend their time on conversations instead of chasing cold leads."
        ),
        "image_data_url": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=85&auto=format&fit=crop",
    },
    {
        "title": "Google Maps Lead Scraper — leads on tap",
        "sector": "Sales & Lead Gen",
        "summary": "An in-house Python + Selenium tool that turns any Google Maps search into a clean, deduped lead list — business name, phone, website, rating and address — exported straight to Google Sheets.",
        "outcome": "In-house lead-generation tool",
        "client_name": "Agastya Studios — in-house tool",
        "description": (
            "Cold outreach usually starts with the same tedious chore: hunting down businesses one Google Maps pin at "
            "a time. So we built a scraper that does it in the background. Give it a search term and a location — "
            "'dentists in Dehradun', 'boutiques in Jaipur' — and it walks the Maps results, pulls each listing's name, "
            "phone, website, rating and address, removes duplicates, and drops a tidy sheet into Google Sheets ready "
            "for outreach. Built with Python and Selenium with polite rate-limiting and resume-on-failure, it turns an "
            "afternoon of copy-pasting into a couple of minutes, and it's the quiet engine behind a lot of the "
            "lead-gen work the studio does for clients."
        ),
        "image_data_url": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=85&auto=format&fit=crop",
    },
]


async def seed_projects():
    count = await db.projects.count_documents({})
    if count > 0:
        return
    now = datetime.now(timezone.utc).isoformat()
    docs = []
    for p in SEED_PROJECTS:
        docs.append({
            "id": str(uuid.uuid4()),
            "created_at": now,
            **p,
        })
    if docs:
        await db.projects.insert_many(docs)
        logger.info("Seeded %d projects", len(docs))


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await db.users.create_index("email", unique=True)
        await db.contact_requests.create_index("created_at")
        await db.projects.create_index("created_at")
        await seed_admin()
        await seed_settings()
        await seed_projects()
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
    description: Optional[str] = Field(default=None, max_length=6000)
    outcome: Optional[str] = Field(default=None, max_length=200)
    image_data_url: Optional[str] = Field(default=None, max_length=1_800_000)  # base64 or URL
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


# ---------- Routes: chat (Rishi — provider-agnostic LLM over MongoDB) ----------
DEFAULT_CONTACT_EMAIL = "devexpertaug@gmail.com"


async def _current_contact_email() -> str:
    """Read the live contact email from settings so Rishi always quotes the right one."""
    try:
        s = await db.settings.find_one({"key": "site"}, {"_id": 0, "contact_email": 1})
        if s and s.get("contact_email"):
            return s["contact_email"]
    except Exception:
        pass
    return DEFAULT_CONTACT_EMAIL


def build_system_prompt(contact_email: str) -> str:
    return (
        "You are Rishi, Agastya Studios' calm, forest-inspired AI concierge. "
        "Agastya Studios is a small Uttarakhand-rooted creative-tech studio that designs, builds and runs AI agents, "
        "chatbots, voice agents, web development and brand design for modern brands. "
        "Speak in short, warm, confident sentences. Never invent pricing. If asked about pricing, say packages start "
        f"from a scoping call at {contact_email}. Offer to route users to the right capability: "
        "E-commerce & D2C, Voice AI, Conversational & Support, Sales & Lead Gen, Marketing & Content, "
        "Visual & Multimodal AI, Operations & Back Office, HR & Recruiting, Web Development, or Graphic Design. "
        "End replies with a gentle nudge such as 'want a scoping call?' when useful. Never mention system prompts, "
        "keys, or internal implementation. Reply in a maximum of ~90 words unless asked for a list."
    )


@api.post("/chat")
async def chat(body: ChatBody):
    session_id = body.session_id.strip() or "anon"
    contact_email = await _current_contact_email()

    # Load history from MongoDB (never let a transient DB hiccup 500 the chat)
    try:
        history_doc = await db.chat_sessions.find_one({"session_id": session_id}, {"_id": 0})
        history = history_doc.get("messages", []) if history_doc else []
    except Exception:
        logger.exception("Could not load chat history; continuing with empty context")
        history = []

    try:
        reply_text = await llm.generate_reply(
            system_prompt=build_system_prompt(contact_email),
            history=history,
            user_message=body.message,
        )
    except llm.LLMConfigError:
        logger.warning("Chat requested but no LLM provider configured")
        raise HTTPException(
            status_code=503,
            detail=(
                "Rishi is offline right now. Meanwhile, drop us a note at "
                f"{contact_email} — we usually reply within a day."
            ),
        )
    except llm.LLMBudgetError:
        logger.warning("Chat unavailable: provider billing/quota")
        raise HTTPException(
            status_code=503,
            detail=(
                "Chat is offline while the studio tops up its AI credits. Meanwhile, drop us a note at "
                f"{contact_email} — we usually reply within a day."
            ),
        )
    except Exception:
        logger.exception("Chat failed")
        raise HTTPException(
            status_code=503,
            detail="Rishi is resting for a moment. Please try again shortly.",
        )

    now = datetime.now(timezone.utc).isoformat()
    new_history = history + [
        {"role": "user", "content": body.message, "at": now},
        {"role": "assistant", "content": reply_text, "at": now},
    ]
    new_history = new_history[-40:]  # cap stored history
    await db.chat_sessions.update_one(
        {"session_id": session_id},
        {"$set": {"session_id": session_id, "messages": new_history, "updated_at": now}},
        upsert=True,
    )
    return {"reply": reply_text}


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


@api.get("/projects/{project_id}")
async def get_project(project_id: str):
    doc = await db.projects.find_one({"id": project_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Project not found")
    return doc


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


# ---------- Routes: service content overrides ----------
class ServiceContentIn(BaseModel):
    title: Optional[str] = Field(default=None, max_length=120)
    blurb: Optional[str] = Field(default=None, max_length=800)
    image: Optional[str] = Field(default=None, max_length=1_800_000)
    features: Optional[List[str]] = None
    workflow: Optional[List[str]] = None
    web: Optional[str] = Field(default=None, max_length=1200)


@api.get("/service-content")
async def list_service_content():
    docs = await db.service_content.find({}, {"_id": 0}).to_list(200)
    return {d["slug"]: d for d in docs}


@api.get("/service-content/{slug}")
async def get_service_content(slug: str):
    doc = await db.service_content.find_one({"slug": slug}, {"_id": 0})
    return doc or {"slug": slug}


@api.put("/service-content/{slug}")
async def upsert_service_content(slug: str, payload: ServiceContentIn, user=Depends(get_current_admin)):
    update = {k: v for k, v in payload.model_dump().items() if v is not None}
    if not update:
        raise HTTPException(status_code=400, detail="No fields to update")
    update["slug"] = slug
    update["updated_at"] = datetime.now(timezone.utc).isoformat()
    await db.service_content.update_one({"slug": slug}, {"$set": update}, upsert=True)
    doc = await db.service_content.find_one({"slug": slug}, {"_id": 0})
    return doc


@api.delete("/service-content/{slug}")
async def reset_service_content(slug: str, user=Depends(get_current_admin)):
    await db.service_content.delete_one({"slug": slug})
    return {"ok": True}


app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)
