# Deploying Agastya Studios

The app has two halves that deploy separately:

| Part | Host | Cost |
|------|------|------|
| **Frontend** (React) | **GitHub Pages** | Free |
| **Backend** (FastAPI) | **Koyeb** (always-on free) | Free |
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

## Step 2 — Backend: Koyeb (free, 24/7, no card)

1. Sign up at <https://www.koyeb.com> and **Create Web Service → GitHub**, pick this repo.
2. **Builder:** Buildpack. **Work directory / source directory:** `backend`.
   (A `Procfile` is included, so the run command is detected automatically:
   `uvicorn server:app --host 0.0.0.0 --port $PORT`.)
3. **Instance:** Free.
4. **Environment variables** (Settings → Environment variables):

   | Key | Value |
   |-----|-------|
   | `MONGO_URL` | your Atlas string from Step 1 |
   | `DB_NAME` | `agastya_studios` |
   | `JWT_SECRET` | a long random string (`openssl rand -hex 32`) |
   | `ADMIN_EMAIL` | your admin login email |
   | `ADMIN_PASSWORD` | a strong admin password |
   | `LLM_PROVIDER` | `openai` (or `anthropic`) |
   | `OPENAI_API_KEY` | your key (needed for the Rishi chatbot) |
   | `CORS_ORIGINS` | `https://devexpertaug-stack.github.io` |

5. Deploy. Koyeb gives you a public URL like `https://<app>-<org>.koyeb.app`.
6. Test it: open `https://<app>-<org>.koyeb.app/api/` — you should see
   `{"message":"Agastya Studios API"}`.

> **Existing data:** the backend auto-seeds projects only into an *empty* database.
> A fresh Atlas cluster is empty, so it seeds automatically. If you ever need to
> add the real projects to a non-empty DB, run `python seed_projects.py` from `backend/`.

> **Render alternative:** Render's free tier works too but sleeps after 15 min idle
> (cold starts). If you use it, add a free uptime pinger (e.g. cron-job.org) hitting
> `/api/` every ~14 min. Same env vars; start command
> `uvicorn server:app --host 0.0.0.0 --port $PORT`.

---

## Step 3 — Frontend: GitHub Pages

1. In the repo: **Settings → Pages → Build and deployment → Source = GitHub Actions**.
2. **Settings → Secrets and variables → Actions → Variables** → add a repository
   **variable**:
   - Name: `REACT_APP_BACKEND_URL`
   - Value: your Koyeb URL from Step 2 (no trailing slash), e.g. `https://<app>-<org>.koyeb.app`
3. The workflow (`.github/workflows/deploy-pages.yml`) runs on every push to `main`
   that touches `frontend/`. Trigger it now via **Actions → Deploy frontend to
   GitHub Pages → Run workflow**, or push any change.
4. When it finishes, your site is live at:
   **`https://devexpertaug-stack.github.io/Agastya_Studios_officialWebsite/`**

Admin panel: `.../Agastya_Studios_officialWebsite/admin` (log in with the
`ADMIN_EMAIL` / `ADMIN_PASSWORD` you set on Koyeb).

---

## Using a custom domain (optional, recommended)

A custom domain serves at the root and removes the `/Agastya_Studios_officialWebsite`
sub-path:

1. Add your domain in **Settings → Pages → Custom domain** (creates a `CNAME`).
2. Point DNS: a `CNAME` record → `devexpertaug-stack.github.io`.
3. In `frontend/package.json`, change `"homepage"` to `"https://yourdomain.com"`
   (or `"/"`), commit, and let the workflow redeploy.
4. Update `CORS_ORIGINS` on Koyeb to your domain.
