# Deploying Agastya Studios

This repo has two parts:

- **`frontend/`** — React (Create React App) marketing site. Deploys to Netlify's free tier.
- **`backend/`** — FastAPI + MongoDB. Netlify can't run this; it needs a Python host (Render/Railway) + MongoDB Atlas.

The site's content (services, projects, pricing, testimonials) is static in the
frontend, so the frontend deploys and works on its own. The backend only powers
the **admin panel, chatbot, contact-form submission, and image overrides** — all
of which fail gracefully when no backend is configured.

---

## 1. Frontend on Netlify (fast path — full site live)

### Option A: Connect the Git repo (recommended)
1. Push this branch / merge to `main` on GitHub.
2. Netlify → **Add new site → Import an existing project** → pick this repo.
3. Netlify auto-detects `netlify.toml`. Confirm:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `build` (i.e. `frontend/build`)
4. (Optional) **Site settings → Environment variables** → add
   `REACT_APP_BACKEND_URL = https://your-backend-url` once the backend exists.
   Leave it unset for a frontend-only deploy.
5. **Deploy**. You get a free `https://<random-name>.netlify.app` URL, and you
   can rename it under **Site settings → Change site name**.

### Option B: Drag-and-drop (no Git)
1. Locally: `cd frontend && npm install --legacy-peer-deps && npm run build`
2. Netlify → **Sites** → drag the generated `frontend/build` folder onto the page.
   (Note: `netlify.toml` redirects aren't applied this way — the included
   `public/_redirects` file handles SPA routing instead, and it is.)

---

## 2. Backend (optional — enables admin, chat, contact form)

1. **MongoDB Atlas** free tier → create a cluster → get the connection string.
2. **Render** → New → Web Service → point at this repo, root `backend/`.
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn server:app --host 0.0.0.0 --port $PORT`
   - Required env vars (the server crashes on startup without these):
     - `MONGO_URL` — Atlas connection string
     - `DB_NAME` — database name, e.g. `agastya`
     - `JWT_SECRET` — any long random string
     - `EMERGENT_LLM_KEY` — key for the chatbot's LLM (Emergent-specific; the
       chat endpoint needs it, so self-hosting the chatbot outside Emergent may
       require swapping in your own LLM provider)
   - Optional: `ADMIN_EMAIL` (default `admin@agastyastudios.com`),
     `ADMIN_PASSWORD` (default `changeme` — change this!)
3. Copy the Render URL into Netlify's `REACT_APP_BACKEND_URL` and redeploy the
   frontend.
4. Make sure the backend allows CORS from your Netlify domain.
