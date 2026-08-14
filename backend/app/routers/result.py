from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Result
from app.schemas import ResultCreate, ResultResponse

router = APIRouter(
    prefix="/results",
    tags=["Results"]
)

@router.post("/", response_model=ResultResponse)
def create_result(result: ResultCreate, db: Session = Depends(get_db)):
    new_result = Result(
        student_id=result.student_id,
        exam_id=result.exam_id,
        marks_obtained=result.marks_obtained,
        grade=result.grade,
    )

    db.add(new_result)
    db.commit()
    db.refresh(new_result)

    return new_result


@router.get("/", response_model=list[ResultResponse])
def get_results(db: Session = Depends(get_db)):
    return db.query(Result).all()


@router.get("/{result_id}", response_model=ResultResponse)
def get_result(result_id: int, db: Session = Depends(get_db)):
    result = db.query(Result).filter(
        Result.id == result_id
    ).first()

    if not result:
        raise HTTPException(status_code=404, detail="Result not found")

    return result


@router.put("/{result_id}", response_model=ResultResponse)
def update_result(result_id: int, result: ResultCreate, db: Session = Depends(get_db)):
    db_result = db.query(Result).filter(
        Result.id == result_id
    ).first()

    if not db_result:
        raise HTTPException(status_code=404, detail="Result not found")

    db_result.student_id = result.student_id
    db_result.exam_id = result.exam_id
    db_result.marks_obtained = result.marks_obtained
    db_result.grade = result.grade

    db.commit()
    db.refresh(db_result)

    return db_result


@router.delete("/{result_id}")
def delete_result(result_id: int, db: Session = Depends(get_db)):
    result = db.query(Result).filter(
        Result.id == result_id
    ).first()

    if not result:
        raise HTTPException(status_code=404, detail="Result not found")

    db.delete(result)
    db.commit()

    return {"message": "Result deleted successfully"}