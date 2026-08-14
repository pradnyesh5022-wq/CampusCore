from pydantic import BaseModel


class CourseCreate(BaseModel):
    department_id: int
    course_name: str
    duration: int


class CourseResponse(BaseModel):
    id: int
    department_id: int
    course_name: str
    duration: int

    class Config:
        from_attributes = True