from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth.roles import student_required
from app.models import Student, Attendance, Result, Fee, Assignment

router = APIRouter(
    prefix="/student-dashboard",
    tags=["Student Dashboard"]
)


@router.get("/")
def student_dashboard(
    db: Session = Depends(get_db),
    token_data: dict = Depends(student_required),
):
    try:
        student = (
            db.query(Student)
            .filter(Student.user_id == token_data["user_id"])
            .first()
        )

        if not student:
            return {
                "message": "Student not found"
            }

        attendance = (
            db.query(Attendance)
            .filter(Attendance.student_id == student.id)
            .count()
        )

        results = (
            db.query(Result)
            .filter(Result.student_id == student.id)
            .count()
        )

        fees = (
            db.query(Fee)
            .filter(Fee.student_id == student.id)
            .count()
        )

        assignments = db.query(Assignment).count()

        return {
            "student_name": student.full_name,
            "roll_no": student.roll_no,
            "semester": student.semester,
            "attendance_records": attendance,
            "result_records": results,
            "fee_records": fees,
            "assignment_records": assignments,
        }

    except Exception as e:
        import traceback

        return {
            "error": str(e),
            "traceback": traceback.format_exc()
        }