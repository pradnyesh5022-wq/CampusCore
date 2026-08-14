from fastapi import FastAPI

from app.database import Base, engine
from app.models import User, Student, Department, Faculty, Course, Attendance, Exam, Result, Fee, Timetable, Assignment
from app.routers.user import router as user_router
from app.routers.student import router as student_router
from app.routers.department import router as department_router
from app.routers.faculty import router as faculty_router
from app.routers.course import router as course_router
from app.routers.attendance import router as attendance_router
from app.routers.exam import router as exam_router
from app.routers.result import router as result_router
from app.routers.fee import router as fee_router
from app.routers.timetable import router as timetable_router
from app.routers.assignment import router as assignment_router
from app.routers.dashboard import router as dashboard_router
from app.routers.student_dashboard import router as student_dashboard_router
from app.routers.faculty_dashboard import router as faculty_dashboard_router
from app.exceptions import register_exception_handlers
from fastapi.middleware.cors import CORSMiddleware

print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Tables created successfully.")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "https://campuscore-frontend-seven.vercel.app",
        "https://campuscore-frontend-qox55uv4x-pradnyesh5022-5486s-projects.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
register_exception_handlers(app)

app.include_router(user_router)
app.include_router(student_router)
app.include_router(department_router)
app.include_router(faculty_router)
app.include_router(course_router)
app.include_router(attendance_router)
app.include_router(exam_router)
app.include_router(result_router)
app.include_router(fee_router)
app.include_router(timetable_router)
app.include_router(assignment_router)
app.include_router(dashboard_router)
app.include_router(student_dashboard_router)
app.include_router(faculty_dashboard_router)


@app.get("/")
def home():
    return {"message": "CampusCore API is running"}


