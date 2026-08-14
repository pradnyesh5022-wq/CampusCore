from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class Faculty(Base):
    __tablename__ = "faculty"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    department_id = Column(Integer, ForeignKey("departments.id"), nullable=True)

    faculty_code = Column(String(20), unique=True, nullable=False)

    full_name = Column(String(100), nullable=False)

    designation = Column(String(100))

    phone = Column(String(15))

    user = relationship("User")

    department = relationship("Department")