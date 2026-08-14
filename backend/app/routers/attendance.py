from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Attendance
from app.schemas import AttendanceCreate, AttendanceResponse

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)

@router.post("/", response_model=AttendanceResponse)
def create_attendance(
    attendance: AttendanceCreate,
    db: Session = Depends(get_db),
):
    new_attendance = Attendance(
        student_id=attendance.student_id,
        faculty_id=attendance.faculty_id,
        course_id=attendance.course_id,
        date=attendance.date,
        status=attendance.status,
    )

    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)

    return new_attendance

@router.get("/", response_model=list[AttendanceResponse])
def get_attendance(db: Session = Depends(get_db)):
    return db.query(Attendance).all()

@router.get("/{attendance_id}", response_model=AttendanceResponse)
def get_attendance_by_id(
    attendance_id: int,
    db: Session = Depends(get_db),
):
    attendance = db.query(Attendance).filter(
        Attendance.id == attendance_id
    ).first()

    if not attendance:
        raise HTTPException(status_code=404, detail="Attendance not found")

    return attendance

@router.put("/{attendance_id}", response_model=AttendanceResponse)
def update_attendance(
    attendance_id: int,
    attendance: AttendanceCreate,
    db: Session = Depends(get_db),
):
    db_attendance = db.query(Attendance).filter(
        Attendance.id == attendance_id
    ).first()

    if not db_attendance:
        raise HTTPException(status_code=404, detail="Attendance not found")

    db_attendance.student_id = attendance.student_id
    db_attendance.faculty_id = attendance.faculty_id
    db_attendance.course_id = attendance.course_id
    db_attendance.date = attendance.date
    db_attendance.status = attendance.status

    db.commit()
    db.refresh(db_attendance)

    return db_attendance

@router.delete("/{attendance_id}")
def delete_attendance(
    attendance_id: int,
    db: Session = Depends(get_db),
):
    attendance = db.query(Attendance).filter(
        Attendance.id == attendance_id
    ).first()

    if not attendance:
        raise HTTPException(status_code=404, detail="Attendance not found")

    db.delete(attendance)
    db.commit()

    return {"message": "Attendance deleted successfully"}

