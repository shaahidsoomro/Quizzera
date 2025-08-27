from fastapi import APIRouter, Depends
from fastapi.responses import PlainTextResponse
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.others import SEOEntry

router = APIRouter()

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@router.get("/seo")
def seo(page: str, db: Session = Depends(get_db)):
    e = db.query(SEOEntry).get(page)
    if not e:
        return {"page": page, "title": "Quizzera", "meta_description": None, "keywords": None, "canonical": None}
    return {"page": e.page, "title": e.title, "meta_description": e.meta_description, "keywords": e.keywords, "canonical": e.canonical}

@router.get("/sitemap.xml", response_class=PlainTextResponse)
def sitemap():
    return """<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n  <url><loc>https://quizzera.pk/</loc></url>\n</urlset>"""

@router.get("/robots.txt", response_class=PlainTextResponse)
def robots():
    return "User-agent: *\nAllow: /\nSitemap: https://quizzera.pk/sitemap.xml\n"

