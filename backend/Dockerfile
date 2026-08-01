# Deterministic backend image — use this if Render (or any host) keeps
# auto-detecting the repo as Node. On Render: New -> Web Service -> Docker,
# Root Directory = backend. No language guessing possible.
FROM python:3.11-slim

WORKDIR /app

# Install deps first for better layer caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# App code
COPY . .

# Render (and most hosts) inject $PORT; default to 8000 locally.
ENV PORT=8000
EXPOSE 8000

CMD ["sh", "-c", "uvicorn server:app --host 0.0.0.0 --port ${PORT:-8000}"]
