from fastapi import Depends, HTTPException

from app.auth.jwt import verify_access_token


def admin_required(token_data: dict = Depends(verify_access_token)):
    if token_data["role"] != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    return token_data


def faculty_required(token_data: dict = Depends(verify_access_token)):
    if token_data["role"] != "faculty":
        raise HTTPException(
            status_code=403,
            detail="Faculty access required"
        )

    return token_data


def student_required(token_data: dict = Depends(verify_access_token)):
    if token_data["role"] != "student":
        raise HTTPException(
            status_code=403,
            detail="Student access required"
        )

    return token_data