from sqlalchemy import Column, Integer, ForeignKey, Date, String
from sqlalchemy.orm import relationship

from app.database import Base


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)

    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)

    faculty_id = Column(Integer, ForeignKey("faculty.id"), nullable=False)

    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)

    date = Column(Date, nullable=False)

    status = Column(String(20), nullable=False)

    student = relationship("Student")
    faculty = relationship("Faculty")
    course = relationship("Course")