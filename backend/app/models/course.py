from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)

    department_id = Column(Integer, ForeignKey("departments.id"), nullable=False)

    course_name = Column(String(100), nullable=False)

    duration = Column(Integer, nullable=False)

    department = relationship("Department")