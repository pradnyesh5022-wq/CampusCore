from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    department_id = Column(Integer, ForeignKey("departments.id"), nullable=True)

    roll_no = Column(String(20), unique=True, nullable=False)

    full_name = Column(String(100), nullable=False)

    phone = Column(String(15))

    semester = Column(Integer)

    user = relationship("User")
    department = relationship("Department", back_populates="students")

    