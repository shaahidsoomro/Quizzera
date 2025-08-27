from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, Boolean, ForeignKey, Text, DateTime, func
from sqlalchemy.dialects.postgresql import JSONB
from app.models.base import Base

class MCQ(Base):
    __tablename__ = "mcqs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    question: Mapped[str] = mapped_column(Text, nullable=False)
    options: Mapped[dict] = mapped_column(JSONB, nullable=False)
    correct_key: Mapped[str] = mapped_column(String(10), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    # New tagging columns for filtering and exam mapping
    exam: Mapped[str | None] = mapped_column(String(100))
    subject: Mapped[str | None] = mapped_column(String(150))
    topic: Mapped[str | None] = mapped_column(String(200))
    difficulty: Mapped[str | None] = mapped_column(String(20))

class Exam(Base):
    __tablename__ = "exams"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    duration_minutes: Mapped[int] = mapped_column(Integer, default=60)
    randomized: Mapped[bool] = mapped_column(Boolean, default=True)

class ExamAttempt(Base):
    __tablename__ = "exam_attempts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False)
    exam_id: Mapped[int] = mapped_column(Integer, ForeignKey("exams.id"), nullable=False)
    started_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    submitted_at: Mapped[DateTime | None]
    score: Mapped[int | None]
    answers: Mapped[dict] = mapped_column(JSONB, default=dict)