from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.resource import Resource

router = APIRouter()

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@router.get("/{type}")
def get_resources(type: str, db: Session = Depends(get_db)):
    return db.query(Resource).filter(Resource.type == type).all()

