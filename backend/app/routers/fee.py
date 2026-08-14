from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Fee
from app.schemas import FeeCreate, FeeResponse

router = APIRouter(
    prefix="/fees",
    tags=["Fees"]
)

@router.post("/", response_model=FeeResponse)
def create_fee(fee: FeeCreate, db: Session = Depends(get_db)):
    new_fee = Fee(
        student_id=fee.student_id,
        amount=fee.amount,
        status=fee.status,
        payment_mode=fee.payment_mode,
    )

    db.add(new_fee)
    db.commit()
    db.refresh(new_fee)

    return new_fee


@router.get("/", response_model=list[FeeResponse])
def get_fees(db: Session = Depends(get_db)):
    return db.query(Fee).all()


@router.get("/{fee_id}", response_model=FeeResponse)
def get_fee(fee_id: int, db: Session = Depends(get_db)):
    fee = db.query(Fee).filter(Fee.id == fee_id).first()

    if not fee:
        raise HTTPException(status_code=404, detail="Fee not found")

    return fee


@router.put("/{fee_id}", response_model=FeeResponse)
def update_fee(fee_id: int, fee: FeeCreate, db: Session = Depends(get_db)):
    db_fee = db.query(Fee).filter(Fee.id == fee_id).first()

    if not db_fee:
        raise HTTPException(status_code=404, detail="Fee not found")

    db_fee.student_id = fee.student_id
    db_fee.amount = fee.amount
    db_fee.status = fee.status
    db_fee.payment_mode = fee.payment_mode

    db.commit()
    db.refresh(db_fee)

    return db_fee


@router.delete("/{fee_id}")
def delete_fee(fee_id: int, db: Session = Depends(get_db)):
    fee = db.query(Fee).filter(Fee.id == fee_id).first()

    if not fee:
        raise HTTPException(status_code=404, detail="Fee not found")

    db.delete(fee)
    db.commit()

    return {"message": "Fee deleted successfully"}