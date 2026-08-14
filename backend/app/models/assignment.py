from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(Integer, primary_key=True, index=True)

    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)

    faculty_id = Column(Integer, ForeignKey("faculty.id"), nullable=False)

    title = Column(String(200), nullable=False)

    description = Column(String(500))

    due_date = Column(Date, nullable=False)

    course = relationship("Course")
    faculty = relationship("Faculty")