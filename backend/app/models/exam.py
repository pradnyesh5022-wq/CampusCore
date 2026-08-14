from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Exam(Base):
    __tablename__ = "exams"

    id = Column(Integer, primary_key=True, index=True)

    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)

    exam_name = Column(String(100), nullable=False)

    exam_date = Column(Date, nullable=False)

    total_marks = Column(Integer, nullable=False)

    course = relationship("Course")