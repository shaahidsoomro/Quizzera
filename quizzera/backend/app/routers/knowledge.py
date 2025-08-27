from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.article import Article
from app.routers.auth import get_current_user

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def seed_fpsc_announcement(db: Session):
    slug = "fpsc-mcq-reform-2025"
    exists = db.query(Article).filter(Article.slug == slug).first()
    if exists:
        return exists
    content = (
        "<p>As of August 22, 2025, the Federal Public Service Commission (FPSC) will replace all descriptive written tests with objective (MCQ) based tests for posts under General Recruitment, effective from Consolidated Advertisement No. 04/2025 (dated 21.9.2025).</p>"
        "<ul>"
        "<li><strong>BS-16 & 17 (All Posts):</strong> One MCQ paper of 100 marks; 40% passing per paper; 0.25 negative per wrong answer.</li>"
        "<li><strong>BS-18 & 19 (Doctors, General Management, Teaching, Professional/Technical):</strong> Two MCQ papers of 100 marks each; 40% passing per paper for Doctors/General; 50% for Teaching/Professional/Technical; 0.25 negative per wrong answer.</li>"
        "<li><strong>BS-20 & 21 (All Posts):</strong> Two MCQ papers of 100 marks each; 50% passing per paper; 0.25 negative per wrong answer.</li>"
        "</ul>"
        "<p>This change applies to all relevant posts advertised by FPSC.</p>"
    )
    art = Article(slug=slug, title="FPSC MCQ-Based Reform (2025)", content=content, tags="FPSC,Policy")
    db.add(art)
    db.commit()
    db.refresh(art)
    return art


@router.post("/seed/fpsc")
def seed(db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    art = seed_fpsc_announcement(db)
    return art


@router.get("")
def list_articles(db: Session = Depends(get_db)):
    return db.query(Article).order_by(Article.created_at.desc()).all()


@router.get("/{slug}")
def get_article(slug: str, db: Session = Depends(get_db)):
    art = db.query(Article).filter(Article.slug == slug).first()
    if not art:
        raise HTTPException(status_code=404, detail="Not found")
    return art


@router.post("")
def create_article(payload: dict, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    required = ["slug", "title", "content"]
    if any(k not in payload for k in required):
        raise HTTPException(status_code=400, detail="Missing fields")
    art = Article(slug=payload["slug"], title=payload["title"], content=payload["content"], tags=payload.get("tags", ""))
    db.add(art)
    db.commit()
    db.refresh(art)
    return art


@router.put("/{slug}")
def update_article(slug: str, payload: dict, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    art = db.query(Article).filter(Article.slug == slug).first()
    if not art:
        raise HTTPException(status_code=404, detail="Not found")
    art.title = payload.get("title", art.title)
    art.content = payload.get("content", art.content)
    art.tags = payload.get("tags", art.tags)
    db.commit()
    db.refresh(art)
    return art


@router.delete("/{slug}")
def delete_article(slug: str, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    art = db.query(Article).filter(Article.slug == slug).first()
    if not art:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(art)
    db.commit()
    return {"ok": True}