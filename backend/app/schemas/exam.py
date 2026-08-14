from datetime import date
from pydantic import BaseModel


class ExamCreate(BaseModel):
    course_id: int
    exam_name: str
    exam_date: date
    total_marks: int


class ExamResponse(BaseModel):
    id: int
    course_id: int
    exam_name: str
    exam_date: date
    total_marks: int

    class Config:
        from_attributes = True