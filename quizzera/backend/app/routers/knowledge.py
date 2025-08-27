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