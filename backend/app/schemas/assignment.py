from datetime import date
from pydantic import BaseModel


class AssignmentCreate(BaseModel):
    course_id: int
    faculty_id: int
    title: str
    description: str
    due_date: date


class AssignmentResponse(BaseModel):
    id: int
    course_id: int
    faculty_id: int
    title: str
    description: str
    due_date: date

    class Config:
        from_attributes = True