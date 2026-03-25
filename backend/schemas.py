from pydantic import BaseModel, ConfigDict
from datetime import date
from typing import Literal

class TransactionBase(BaseModel):
    amount: float
    type: Literal['credit', 'debit']
    description: str | None = None
    date: date

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
