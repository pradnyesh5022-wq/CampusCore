from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Exam
from app.schemas import ExamCreate, ExamResponse

router = APIRouter(
    prefix="/exams",
    tags=["Exams"]
)

@router.post("/", response_model=ExamResponse)
def create_exam(exam: ExamCreate, db: Session = Depends(get_db)):
    new_exam = Exam(
        course_id=exam.course_id,
        exam_name=exam.exam_name,
        exam_date=exam.exam_date,
        total_marks=exam.total_marks,
    )

    db.add(new_exam)
    db.commit()
    db.refresh(new_exam)

    return new_exam

@router.get("/", response_model=list[ExamResponse])
def get_exams(db: Session = Depends(get_db)):
    return db.query(Exam).all()

@router.get("/{exam_id}", response_model=ExamResponse)
def get_exam(exam_id: int, db: Session = Depends(get_db)):
    exam = db.query(Exam).filter(
        Exam.id == exam_id
    ).first()

    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")

    return exam

@router.put("/{exam_id}", response_model=ExamResponse)
def update_exam(exam_id: int, exam: ExamCreate, db: Session = Depends(get_db)):
    db_exam = db.query(Exam).filter(
        Exam.id == exam_id
    ).first()

    if not db_exam:
        raise HTTPException(status_code=404, detail="Exam not found")

    db_exam.course_id = exam.course_id
    db_exam.exam_name = exam.exam_name
    db_exam.exam_date = exam.exam_date
    db_exam.total_marks = exam.total_marks

    db.commit()
    db.refresh(db_exam)

    return db_exam

@router.delete("/{exam_id}")
def delete_exam(exam_id: int, db: Session = Depends(get_db)):
    exam = db.query(Exam).filter(
        Exam.id == exam_id
    ).first()

    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")

    db.delete(exam)
    db.commit()

    return {"message": "Exam deleted successfully"}

