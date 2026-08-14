from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Student
from app.schemas import StudentCreate, StudentResponse
from app.auth.roles import admin_required

router = APIRouter(
    prefix="/students",
    tags=["Students"]
)


@router.post("/", response_model=StudentResponse)
def create_student(
    student: StudentCreate,
    db: Session = Depends(get_db),
    token_data: dict = Depends(admin_required),
):
    new_student = Student(
        user_id=student.user_id,
        department_id=student.department_id,
        roll_no=student.roll_no,
        full_name=student.full_name,
        phone=student.phone,
        semester=student.semester,
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return new_student


@router.get("/", response_model=list[StudentResponse])
def get_students(
    search: str = "",
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    students = (
        db.query(Student)
        .filter(Student.full_name.ilike(f"%{search}%"))
        .offset(skip)
        .limit(limit)
        .all()
    )

    return students


@router.get("/{student_id}", response_model=StudentResponse)
def get_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    return student


@router.put("/{student_id}", response_model=StudentResponse)
def update_student(
    student_id: int,
    student: StudentCreate,
    db: Session = Depends(get_db),
):
    db_student = db.query(Student).filter(Student.id == student_id).first()

    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")

    db_student.user_id = student.user_id
    db_student.department_id = student.department_id
    db_student.roll_no = student.roll_no
    db_student.full_name = student.full_name
    db_student.phone = student.phone
    db_student.semester = student.semester

    db.commit()
    db.refresh(db_student)

    return db_student


@router.delete("/{student_id}")
def delete_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    db.delete(student)
    db.commit()

    return {"message": "Student deleted successfully"}