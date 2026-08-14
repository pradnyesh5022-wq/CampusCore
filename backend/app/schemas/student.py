from pydantic import BaseModel


class StudentCreate(BaseModel):
    user_id: int
    department_id: int
    roll_no: str
    full_name: str
    phone: str
    semester: int


class StudentResponse(BaseModel):
    id: int
    user_id: int
    department_id: int
    roll_no: str
    full_name: str
    phone: str
    semester: int

    class Config:
        from_attributes = True