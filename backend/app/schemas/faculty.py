from pydantic import BaseModel


class FacultyCreate(BaseModel):
    user_id: int
    department_id: int
    faculty_code: str
    full_name: str
    designation: str
    phone: str


class FacultyResponse(BaseModel):
    id: int
    user_id: int
    department_id: int
    faculty_code: str
    full_name: str
    designation: str
    phone: str

    class Config:
        from_attributes = True