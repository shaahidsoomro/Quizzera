from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.others import Mentor, Booking
from app.routers.auth import get_current_user

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("")
def list_mentors(db: Session = Depends(get_db)):
    return db.query(Mentor).all()


@router.post("/{id}/book")
def book(id: int, payload: dict, db: Session = Depends(get_db), user=Depends(get_current_user)):
    slot = payload.get("slot")
    if not slot:
        raise HTTPException(status_code=400, detail="slot required")
    if not db.query(Mentor).get(id):
        raise HTTPException(status_code=404, detail="Mentor not found")
    b = Booking(mentor_id=id, user_id=user.id, slot=slot, status="pending")
    db.add(b)
    db.commit()
    db.refresh(b)
    return b

