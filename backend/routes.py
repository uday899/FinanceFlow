from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import date, timedelta
import models, schemas
from database import get_db

router = APIRouter()

@router.post("/transactions", response_model=schemas.Transaction)
def create_transaction(transaction: schemas.TransactionCreate, db: Session = Depends(get_db)):
    db_transaction = models.Transaction(**transaction.model_dump())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

@router.get("/transactions", response_model=List[schemas.Transaction])
def read_transactions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    transactions = db.query(models.Transaction).order_by(models.Transaction.date.desc()).offset(skip).limit(limit).all()
    return transactions

@router.get("/report/weekly")
def get_weekly_report(db: Session = Depends(get_db)):
    today = date.today()
    start_of_week = today - timedelta(days=today.weekday())
    end_of_week = start_of_week + timedelta(days=6)

    transactions = db.query(models.Transaction).filter(
        models.Transaction.date >= start_of_week,
        models.Transaction.date <= end_of_week
    ).all()

    total_credit = sum(t.amount for t in transactions if t.type == 'credit')
    total_debit = sum(t.amount for t in transactions if t.type == 'debit')

    return {
        "start_of_week": start_of_week,
        "end_of_week": end_of_week,
        "total_credit": total_credit,
        "total_debit": total_debit,
        "net_balance": total_credit - total_debit,
        "transactions": transactions
    }

@router.delete("/transactions")
def clear_transactions(db: Session = Depends(get_db)):
    db.query(models.Transaction).delete()
    db.commit()
    return {"message": "All transactions cleared"}
