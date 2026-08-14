from pydantic import BaseModel


class DepartmentCreate(BaseModel):
    name: str
    hod: str


class DepartmentResponse(BaseModel):
    id: int
    name: str
    hod: str

    class Config:
        from_attributes = True