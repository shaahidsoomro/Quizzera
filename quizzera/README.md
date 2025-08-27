# Quizzera

Full-stack quiz and exam platform.

- Frontend: Next.js + Tailwind CSS + React Query + Framer Motion
- Backend: FastAPI + PostgreSQL + SQLAlchemy + JWT + Alembic
- Deployment: Docker + Docker Compose

## Quickstart

1. Copy env file:
   cp .env.example .env
2. Build and start:
   docker compose up -d --build
3. Open:
   - Frontend: http://localhost:3000
   - API: http://localhost:8000/docs

## Health endpoints

- Backend liveness: GET /healthz → 200 OK
- Backend readiness: GET /ready → 200 OK when DB is ready

## Development

- Frontend dev: `cd frontend && npm run dev`
- Backend dev: `cd backend && uvicorn app.main:app --reload`

## Admin User

An admin user is automatically created on startup:
- Email: `shahidsoomro786@gmail.com`
- Password: `Shahid@786`
- Role: `admin`

## Migrations

Alembic runs automatically on container start (compose).

Manual:

```
cd backend
alembic revision -m "your message"
alembic upgrade head
```