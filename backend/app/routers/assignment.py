from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Assignment
from app.schemas import AssignmentCreate, AssignmentResponse

router = APIRouter(
    prefix="/assignments",
    tags=["Assignments"]
)

@router.post("/", response_model=AssignmentResponse)
def create_assignment(assignment: AssignmentCreate, db: Session = Depends(get_db)):
    new_assignment = Assignment(
        course_id=assignment.course_id,
        faculty_id=assignment.faculty_id,
        title=assignment.title,
        description=assignment.description,
        due_date=assignment.due_date,
    )

    db.add(new_assignment)
    db.commit()
    db.refresh(new_assignment)

    return new_assignment


@router.get("/", response_model=list[AssignmentResponse])
def get_assignments(db: Session = Depends(get_db)):
    return db.query(Assignment).all()


@router.get("/{assignment_id}", response_model=AssignmentResponse)
def get_assignment(assignment_id: int, db: Session = Depends(get_db)):
    assignment = db.query(Assignment).filter(
        Assignment.id == assignment_id
    ).first()

    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")

    return assignment


@router.put("/{assignment_id}", response_model=AssignmentResponse)
def update_assignment(
    assignment_id: int,
    assignment: AssignmentCreate,
    db: Session = Depends(get_db),
):
    db_assignment = db.query(Assignment).filter(
        Assignment.id == assignment_id
    ).first()

    if not db_assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")

    db_assignment.course_id = assignment.course_id
    db_assignment.faculty_id = assignment.faculty_id
    db_assignment.title = assignment.title
    db_assignment.description = assignment.description
    db_assignment.due_date = assignment.due_date

    db.commit()
    db.refresh(db_assignment)

    return db_assignment


@router.delete("/{assignment_id}")
def delete_assignment(
    assignment_id: int,
    db: Session = Depends(get_db),
):
    assignment = db.query(Assignment).filter(
        Assignment.id == assignment_id
    ).first()

    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")

    db.delete(assignment)
    db.commit()

    return {"message": "Assignment deleted successfully"}