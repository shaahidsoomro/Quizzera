from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, mcqs, exams, analytics, export
from app.models.base import Base
from app.db.session import engine

app = FastAPI(title="Quizzera API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    # For initial bootstrapping; in production prefer Alembic migrations
    Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"status": "ok", "service": "quizzera-api"}

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(mcqs.router, prefix="/mcqs", tags=["mcqs"])
app.include_router(exams.router, prefix="/exams", tags=["exams"])
app.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
app.include_router(export.router, prefix="/export", tags=["export"])