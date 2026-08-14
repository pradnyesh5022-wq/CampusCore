from pydantic import BaseModel


class ResultCreate(BaseModel):
    student_id: int
    exam_id: int
    marks_obtained: int
    grade: str


class ResultResponse(BaseModel):
    id: int
    student_id: int
    exam_id: int
    marks_obtained: int
    grade: str

    class Config:
        from_attributes = True