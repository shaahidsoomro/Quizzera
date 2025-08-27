from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.middleware.rate_limit import RateLimitMiddleware

from app.routers import auth, mcqs, exams, analytics, export
from app.routers import knowledge
from app.routers import exams_catalog, mock_exams, resources, notifications_jobs, eligibility, mentors, community, seo
from app.api.v1.routers import payments as payments_v1
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
app.add_middleware(RateLimitMiddleware, max_per_minute=30)

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"status": "ok", "service": "quizzera-api"}

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(mcqs.router, prefix="/mcqs", tags=["mcqs"])
app.include_router(exams.router, prefix="/exams", tags=["exams"])
app.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
app.include_router(export.router, prefix="/export", tags=["export"])
app.include_router(knowledge.router, prefix="/kb", tags=["knowledge"])
app.include_router(exams_catalog.router, prefix="/exams", tags=["exams"])
app.include_router(mock_exams.router, prefix="/mock-exams", tags=["mock-exams"])
app.include_router(resources.router, prefix="/resources", tags=["resources"])
app.include_router(notifications_jobs.router, tags=["notifications", "jobs"])  # /notifications, /jobs
app.include_router(eligibility.router, prefix="/eligibility", tags=["eligibility"])
app.include_router(mentors.router, prefix="/mentors", tags=["mentors"])
app.include_router(community.router, tags=["community"])  # /community/*, /forum
app.include_router(seo.router, tags=["seo"])  # /seo/page, /sitemap.xml, /robots.txt
app.include_router(payments_v1.router, prefix="/api/v1", tags=["payments"])  # payments stubs