# Deploying Agastya Studios

The app has two halves that deploy separately:

| Part | Host | Cost |
|------|------|------|
| **Frontend** (React) | **GitHub Pages** | Free |
| **Backend** (FastAPI) | **Render** (free) + keep-alive pinger | Free |
| **Database** | **MongoDB Atlas** (M0) | Free |

> The frontend is just static files, so it can't run the FastAPI backend. Deploy
> the backend + database first, then point the frontend at it.

---

## Step 1 — Database: MongoDB Atlas (free, always-on)

1. Create an account at <https://www.mongodb.com/atlas> and create a **free M0 cluster**.
2. **Database Access** → add a user (username + password). Save these.
3. **Network Access** → Add IP `0.0.0.0/0` (allow from anywhere) so Koyeb can connect.
4. **Connect → Drivers** → copy the connection string. It looks like:
   `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority`
   This is your `MONGO_URL`.

---

## Step 2 — Backend: Render (free, no credit card)

This repo includes a **`render.yaml` blueprint**, so setup is almost one-click.

1. Sign up at <https://render.com> (the free plan needs no credit card).
2. **New → Blueprint**, connect this GitHub repo. Render reads `render.yaml` and
   creates a free web service from `backend/` (build + start commands are already
   defined).
3. When prompted, fill in the four secret env vars (the blueprint sets the rest
   automatically):

   | Key | Value |
   |-----|-------|
   | `MONGO_URL` | your Atlas string from Step 1 |
   | `ADMIN_EMAIL` | your admin login email |
   | `ADMIN_PASSWORD` | a strong admin password |
   | `OPENAI_API_KEY` | your key (needed for the Rishi chatbot) |

   Auto-set by the blueprint: `DB_NAME=agastya_studios`, `LLM_PROVIDER=openai`,
   `CORS_ORIGINS=https://devexpertaug-stack.github.io`, and a random `JWT_SECRET`.
4. Deploy. Render gives you a URL like `https://agastya-studios-api.onrender.com`.
5. Test it: open `https://<your-service>.onrender.com/api/` — you should see
   `{"message":"Agastya Studios API"}`.

> Prefer manual setup? **New → Web Service → this repo**, Root Directory `backend`,
> Runtime `Python`, Start Command `uvicorn server:app --host 0.0.0.0 --port $PORT`,
> then add the env vars above.

### Keep it awake 24/7 (important on the free plan)

Render's free service sleeps after ~15 min idle (the next request then waits ~30–60s
for a cold start). Keep it warm with a **free uptime pinger**:

1. Go to <https://cron-job.org> (free) — or UptimeRobot.
2. Create a job that GETs `https://<your-service>.onrender.com/api/` every **10 minutes**.

That keeps the single free service effectively always-on.

> **Existing data:** the backend auto-seeds projects only into an *empty* database.
> A fresh Atlas cluster is empty, so it seeds automatically. To add the real
> projects to a non-empty DB later, run `python seed_projects.py` from `backend/`.

> **Other free options:** **Fly.io** ($5/mo free credit, no sleep — but requires a
> card) or **Hugging Face Spaces** (Docker, free, sleeps after 48h idle). The same
> start command and env vars apply everywhere.

---

## Step 3 — Frontend: GitHub Pages

1. In the repo: **Settings → Pages → Build and deployment → Source = GitHub Actions**.
2. **Settings → Secrets and variables → Actions → Variables** → add a repository
   **variable**:
   - Name: `REACT_APP_BACKEND_URL`
   - Value: your backend URL from Step 2 (no trailing slash), e.g. `https://agastya-studios-api.onrender.com`
3. The workflow (`.github/workflows/deploy-pages.yml`) runs on every push to `main`
   that touches `frontend/`. Trigger it now via **Actions → Deploy frontend to
   GitHub Pages → Run workflow**, or push any change.
4. When it finishes, your site is live at:
   **`https://devexpertaug-stack.github.io/Agastya_Studios_officialWebsite/`**

Admin panel: `.../Agastya_Studios_officialWebsite/admin` (log in with the
`ADMIN_EMAIL` / `ADMIN_PASSWORD` you set on the backend host).

---

## Using a custom domain (optional, recommended)

A custom domain serves at the root and removes the `/Agastya_Studios_officialWebsite`
sub-path:

1. Add your domain in **Settings → Pages → Custom domain** (creates a `CNAME`).
2. Point DNS: a `CNAME` record → `devexpertaug-stack.github.io`.
3. In `frontend/package.json`, change `"homepage"` to `"https://yourdomain.com"`
   (or `"/"`), commit, and let the workflow redeploy.
4. Update `CORS_ORIGINS` on your backend host (Render) to your domain.
