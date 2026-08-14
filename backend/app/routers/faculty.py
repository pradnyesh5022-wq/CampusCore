from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Faculty
from app.schemas import FacultyCreate, FacultyResponse
from app.auth.roles import admin_required

router = APIRouter(
    prefix="/faculty",
    tags=["Faculty"]
)

@router.post("/", response_model=FacultyResponse)
def create_faculty(
    faculty: FacultyCreate,
    db: Session = Depends(get_db),
    token_data: dict = Depends(admin_required),
):
    new_faculty = Faculty(
        user_id=faculty.user_id,
        department_id=faculty.department_id,
        faculty_code=faculty.faculty_code,
        full_name=faculty.full_name,
        designation=faculty.designation,
        phone=faculty.phone,
    )

    db.add(new_faculty)
    db.commit()
    db.refresh(new_faculty)

    return new_faculty

@router.get("/", response_model=list[FacultyResponse])
def get_faculty(db: Session = Depends(get_db)):
    return db.query(Faculty).all()

@router.get("/{faculty_id}", response_model=FacultyResponse)
def get_faculty_by_id(
    faculty_id: int,
    db: Session = Depends(get_db),
):
    faculty = db.query(Faculty).filter(
        Faculty.id == faculty_id
    ).first()

    if not faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")

    return faculty

@router.put("/{faculty_id}", response_model=FacultyResponse)
def update_faculty(
    faculty_id: int,
    faculty: FacultyCreate,
    db: Session = Depends(get_db),
):
    db_faculty = db.query(Faculty).filter(
        Faculty.id == faculty_id
    ).first()

    if not db_faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")

    db_faculty.user_id = faculty.user_id
    db_faculty.department_id = faculty.department_id
    db_faculty.faculty_code = faculty.faculty_code
    db_faculty.full_name = faculty.full_name
    db_faculty.designation = faculty.designation
    db_faculty.phone = faculty.phone

    db.commit()
    db.refresh(db_faculty)

    return db_faculty

@router.delete("/{faculty_id}")
def delete_faculty(
    faculty_id: int,
    db: Session = Depends(get_db),
):
    faculty = db.query(Faculty).filter(
        Faculty.id == faculty_id
    ).first()

    if not faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")

    db.delete(faculty)
    db.commit()

    return {"message": "Faculty deleted successfully"}

