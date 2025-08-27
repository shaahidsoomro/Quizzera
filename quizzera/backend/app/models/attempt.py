from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, ForeignKey, DateTime, func, Boolean
from sqlalchemy.dialects.postgresql import JSONB
from app.models.base import Base

class Attempt(Base):
    __tablename__ = "attempts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False)
    exam_id: Mapped[int] = mapped_column(Integer, ForeignKey("exams.id"), nullable=False)
    started_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    finished_at: Mapped[DateTime | None]
    score: Mapped[int | None]
    completed: Mapped[bool] = mapped_column(Boolean, default=False)

class AttemptAnswer(Base):
    __tablename__ = "attempt_answers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    attempt_id: Mapped[int] = mapped_column(Integer, ForeignKey("attempts.id"), nullable=False)
    question_id: Mapped[int] = mapped_column(Integer, ForeignKey("questions.id"), nullable=False)
    chosen_option_id: Mapped[int | None] = mapped_column(Integer, ForeignKey("options.id"))
    text_answer: Mapped[str | None]
    is_correct: Mapped[bool | None]
    points: Mapped[int | None]