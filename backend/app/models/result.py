from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Result(Base):
    __tablename__ = "results"

    id = Column(Integer, primary_key=True, index=True)

    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)

    exam_id = Column(Integer, ForeignKey("exams.id"), nullable=False)

    marks_obtained = Column(Integer, nullable=False)

    grade = Column(String(5), nullable=False)

    student = relationship("Student")
    exam = relationship("Exam")