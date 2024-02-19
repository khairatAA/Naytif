#!/usr/bin/python3
"""The TokenBlocklist Model"""
from sqlalchemy import String, DateTime, Text, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from models import db
from datetime import datetime
import uuid


class TokenBlocklist(db.Model):
    """The TokenBlocklist class"""
    __tablename__ = "token_blocklists"
    id:Mapped[str] = mapped_column(String(128), primary_key=True, nullable=False)
    jti:Mapped[str] = mapped_column(String(36), nullable=False, index=True)
    created_at: Mapped[str] = mapped_column(DateTime(timezone=True), server_default=func.now())