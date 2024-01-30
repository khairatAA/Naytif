#!/usr/bin/python3
"""The Driver model"""
from sqlalchemy import String, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from models import db
from datetime import datetime
import uuid


class Driver(db.Model):
    """Driver Class"""
    __tablename__ = "drivers"
    id:Mapped[int] = mapped_column(String(128), primary_key=True, nullable=False)
    first_name: Mapped[str] = mapped_column(String(60), nullable=False)  
    last_name: Mapped[str] = mapped_column(String(60), nullable=False)  
    email: Mapped[str] = mapped_column(String(60), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(60), nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=False)
    vehicle_type: Mapped[str] = mapped_column(String(20), nullable=False)
    image_url: Mapped[str] = mapped_column(String(255), nullable=True)
    created_at:Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    orders = relationship("Order", back_populates="driver")

    def to_dict(self):
        """Serializes the class object to dictionary"""
        driver_dict = self.__dict__.copy()

        if driver_dict.get('_sa_instance_state'):
            del driver_dict['_sa_instance_state']
        return driver_dict