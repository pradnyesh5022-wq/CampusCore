from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Fee(Base):
    __tablename__ = "fees"

    id = Column(Integer, primary_key=True, index=True)

    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)

    amount = Column(Float, nullable=False)

    status = Column(String(20), nullable=False)

    payment_mode = Column(String(50), nullable=False)

    student = relationship("Student")