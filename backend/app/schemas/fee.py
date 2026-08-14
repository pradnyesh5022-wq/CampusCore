from pydantic import BaseModel


class FeeCreate(BaseModel):
    student_id: int
    amount: float
    status: str
    payment_mode: str


class FeeResponse(BaseModel):
    id: int
    student_id: int
    amount: float
    status: str
    payment_mode: str

    class Config:
        from_attributes = True