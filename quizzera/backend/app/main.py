import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.routers import auth, mcqs, exams, analytics, export
from app.models.base import Base
from app.db.session import engine
from app.core.config import settings

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s %(message)s",
)

app = FastAPI(title="Quizzera API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.backend_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    # Migrations are handled by Alembic outside the app startup
    pass

@app.get("/")
def read_root():
    return {"status": "ok", "service": "quizzera-api"}


@app.get("/healthz", response_class=JSONResponse)
def healthz():
    return {"status": "ok"}


@app.get("/ready", response_class=JSONResponse)
def readiness_probe():
    try:
        # Attempt a lightweight DB connection check
        with engine.connect() as connection:
            connection.execute("SELECT 1")
        return {"status": "ready"}
    except Exception as exc:  # pragma: no cover - defensive
        logging.getLogger(__name__).exception("Readiness check failed: %s", exc)
        return JSONResponse(status_code=503, content={"status": "not_ready"})

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(mcqs.router, prefix="/mcqs", tags=["mcqs"])
app.include_router(exams.router, prefix="/exams", tags=["exams"])
app.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
app.include_router(export.router, prefix="/export", tags=["export"])