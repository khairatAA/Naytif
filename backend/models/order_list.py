#!/usr/bin/python3
"""The Order Model"""
from sqlalchemy import String, DateTime, Text, Integer, DECIMAL
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from models import db
from datetime import datetime
import uuid


class OrderList(db.Model):
    """The Order class"""
    __tablename__ = "order_lists"
    id:Mapped[str] = mapped_column(String(128), primary_key=True, nullable=False)
    orders = relationship("Order", back_populates="order_list")