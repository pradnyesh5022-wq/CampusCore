from pydantic import BaseModel


class TimetableCreate(BaseModel):
    course_id: int
    faculty_id: int
    day: str
    start_time: str
    end_time: str
    room_no: str


class TimetableResponse(BaseModel):
    id: int
    course_id: int
    faculty_id: int
    day: str
    start_time: str
    end_time: str
    room_no: str

    class Config:
        from_attributes = True