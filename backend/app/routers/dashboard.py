from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.auth.roles import admin_required
from app.database import get_db
from app.models import (
    Assignment,
    Attendance,
    Course,
    Department,
    Exam,
    Faculty,
    Fee,
    Result,
    Student,
    User,
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/")
def dashboard(
    db: Session = Depends(get_db),
    token_data: dict = Depends(admin_required),
):
    total_students = db.query(Student).count()

    total_faculty = db.query(Faculty).count()

    total_departments = db.query(Department).count()

    total_courses = db.query(Course).count()

    total_exams = db.query(Exam).count()

    total_results = db.query(Result).count()

    total_assignments = db.query(Assignment).count()

    total_users = db.query(User).count()

    total_fee = (
        db.query(func.coalesce(func.sum(Fee.amount), 0))
        .scalar()
    )

    total_attendance = db.query(Attendance).count()

    present_attendance = (
        db.query(Attendance)
        .filter(Attendance.status == "Present")
        .count()
    )

    attendance_percentage = (
        (present_attendance / total_attendance) * 100
        if total_attendance
        else 0
    )

    recent_students = (
        db.query(Student)
        .order_by(Student.id.desc())
        .limit(5)
        .all()
    )

    return {
        "analytics": {
            "students": total_students,
            "faculty": total_faculty,
            "departments": total_departments,
            "courses": total_courses,
            "users": total_users,
            "exams": total_exams,
            "results": total_results,
            "assignments": total_assignments,
            "fees_collected": total_fee,
            "attendance_percentage": round(attendance_percentage, 2),
        },
        "recent_students": [
            {
                "id": student.id,
                "name": student.full_name,
                "roll_no": student.roll_no,
                "semester": student.semester,
            }
            for student in recent_students
        ],
    }