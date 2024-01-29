#!/usr/bin/python3
"""The user model"""
from models.base_model import BaseModel
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func
from models import db


class User(BaseModel, db.Model):
    __tablename__ = "users"
    name: Mapped[str] = mapped_column(String(60), nullable=False)  
    email: Mapped[str] = mapped_column(String(60), nullable=False)
    password: Mapped[str] = mapped_column(String(60), nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=True)
    image_url: Mapped[str] = mapped_column(String(255), nullable=True)