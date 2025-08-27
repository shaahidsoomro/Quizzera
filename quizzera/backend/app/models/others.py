from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, ForeignKey, Text, Date, DateTime, func
from sqlalchemy.dialects.postgresql import JSONB
from app.models.base import Base

class PastPaper(Base):
    __tablename__ = "past_papers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    exam_id: Mapped[int] = mapped_column(Integer, ForeignKey("exams.id"), nullable=False)
    year: Mapped[int] = mapped_column(Integer, nullable=False)
    subject_id: Mapped[int] = mapped_column(Integer, ForeignKey("subjects.id"), nullable=False)
    pdf_url: Mapped[str] = mapped_column(String(500), nullable=False)
    parsed_json: Mapped[dict | None] = mapped_column(JSONB)

class Notification(Base):
    __tablename__ = "notifications"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    body_id: Mapped[int] = mapped_column(Integer, ForeignKey("exam_bodies.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(300), nullable=False)
    ref_no: Mapped[str | None] = mapped_column(String(100))
    bps_scale_from: Mapped[int | None]
    bps_scale_to: Mapped[int | None]
    publish_date: Mapped[Date | None]
    deadline: Mapped[Date | None]
    link: Mapped[str | None] = mapped_column(String(500))
    raw_html: Mapped[str | None] = mapped_column(Text)
    source: Mapped[str | None] = mapped_column(String(200))

class Job(Base):
    __tablename__ = "jobs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    notification_id: Mapped[int | None] = mapped_column(Integer, ForeignKey("notifications.id"))
    title: Mapped[str] = mapped_column(String(300), nullable=False)
    department: Mapped[str | None] = mapped_column(String(200))
    bps_scale: Mapped[int | None]
    province_quota: Mapped[str | None] = mapped_column(String(100))
    seats: Mapped[int | None]
    requirements_json: Mapped[dict | None] = mapped_column(JSONB)
    apply_link: Mapped[str | None] = mapped_column(String(500))
    deadline: Mapped[Date | None]

class Mentor(Base):
    __tablename__ = "mentors"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False)
    bio: Mapped[str | None] = mapped_column(Text)
    rating: Mapped[int | None]
    slots_json: Mapped[dict | None] = mapped_column(JSONB)

class Booking(Base):
    __tablename__ = "bookings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    mentor_id: Mapped[int] = mapped_column(Integer, ForeignKey("mentors.id"), nullable=False)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False)
    slot: Mapped[str] = mapped_column(String(100), nullable=False)
    status: Mapped[str] = mapped_column(String(30), default="pending")

class SEOEntry(Base):
    __tablename__ = "seo_entries"

    page: Mapped[str] = mapped_column(String(255), primary_key=True)
    title: Mapped[str] = mapped_column(String(255))
    meta_description: Mapped[str | None] = mapped_column(String(300))
    keywords: Mapped[str | None] = mapped_column(String(300))
    canonical: Mapped[str | None] = mapped_column(String(300))
    updated_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())