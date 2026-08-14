from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Timetable
from app.schemas import TimetableCreate, TimetableResponse

router = APIRouter(
    prefix="/timetables",
    tags=["Timetables"]
)

@router.post("/", response_model=TimetableResponse)
def create_timetable(timetable: TimetableCreate, db: Session = Depends(get_db)):
    new_timetable = Timetable(
        course_id=timetable.course_id,
        faculty_id=timetable.faculty_id,
        day=timetable.day,
        start_time=timetable.start_time,
        end_time=timetable.end_time,
        room_no=timetable.room_no,
    )

    db.add(new_timetable)
    db.commit()
    db.refresh(new_timetable)

    return new_timetable


@router.get("/", response_model=list[TimetableResponse])
def get_timetables(db: Session = Depends(get_db)):
    return db.query(Timetable).all()


@router.get("/{timetable_id}", response_model=TimetableResponse)
def get_timetable(timetable_id: int, db: Session = Depends(get_db)):
    timetable = db.query(Timetable).filter(Timetable.id == timetable_id).first()

    if not timetable:
        raise HTTPException(status_code=404, detail="Timetable not found")

    return timetable


@router.put("/{timetable_id}", response_model=TimetableResponse)
def update_timetable(timetable_id: int, timetable: TimetableCreate, db: Session = Depends(get_db)):
    db_timetable = db.query(Timetable).filter(Timetable.id == timetable_id).first()

    if not db_timetable:
        raise HTTPException(status_code=404, detail="Timetable not found")

    db_timetable.course_id = timetable.course_id
    db_timetable.faculty_id = timetable.faculty_id
    db_timetable.day = timetable.day
    db_timetable.start_time = timetable.start_time
    db_timetable.end_time = timetable.end_time
    db_timetable.room_no = timetable.room_no

    db.commit()
    db.refresh(db_timetable)

    return db_timetable


@router.delete("/{timetable_id}")
def delete_timetable(timetable_id: int, db: Session = Depends(get_db)):
    timetable = db.query(Timetable).filter(Timetable.id == timetable_id).first()

    if not timetable:
        raise HTTPException(status_code=404, detail="Timetable not found")

    db.delete(timetable)
    db.commit()

    return {"message": "Timetable deleted successfully"}