from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.roles import faculty_required
from app.database import get_db
from app.models import Faculty, Course, Assignment, Exam, Timetable

router = APIRouter(
    prefix="/faculty-dashboard",
    tags=["Faculty Dashboard"]
)


@router.get("/")
def faculty_dashboard(
    db: Session = Depends(get_db),
    token_data: dict = Depends(faculty_required),
):
    faculty = (
        db.query(Faculty)
        .filter(Faculty.user_id == token_data["user_id"])
        .first()
    )

    if not faculty:
        return {
            "message": "Faculty not found"
        }

    courses = (
        db.query(Course)
        .filter(Course.department_id == faculty.department_id)
        .count()
    )

    assignments = db.query(Assignment).count()

    exams = db.query(Exam).count()

    timetable = db.query(Timetable).count()

    return {
        "faculty_name": faculty.full_name,
        "designation": faculty.designation,
        "courses": courses,
        "assignments": assignments,
        "exams": exams,
        "timetable": timetable,
    }