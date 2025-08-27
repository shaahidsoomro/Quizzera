from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.others import Mentor, Booking

router = APIRouter()

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@router.get("")
def list_mentors(subject: str | None = None, db: Session = Depends(get_db)):
    q = db.query(Mentor)
    return q.all()

@router.post("/{id}/book")
def book(id: int, payload: dict, db: Session = Depends(get_db)):
    slot = payload.get("slot")
    if not slot: raise HTTPException(status_code=400, detail="slot required")
    if not db.query(Mentor).get(id): raise HTTPException(status_code=404, detail="Mentor not found")
    b = Booking(mentor_id=id, user_id=0, slot=slot, status="pending")
    db.add(b); db.commit(); db.refresh(b)
    return b

