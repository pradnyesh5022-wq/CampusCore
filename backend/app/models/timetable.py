from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Timetable(Base):
    __tablename__ = "timetables"

    id = Column(Integer, primary_key=True, index=True)

    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)

    faculty_id = Column(Integer, ForeignKey("faculty.id"), nullable=False)

    day = Column(String(20), nullable=False)

    start_time = Column(String(20), nullable=False)

    end_time = Column(String(20), nullable=False)

    room_no = Column(String(20), nullable=False)

    course = relationship("Course")
    faculty = relationship("Faculty")