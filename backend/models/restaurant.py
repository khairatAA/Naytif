#!/usr/bin/python3
"""The restaurant model"""
from sqlalchemy import String, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func
from models import db
from datetime import datetime
import uuid


class Restaurant(db.Model):
    """The Restaurant class"""
    __tablename__ = "restaurants"
    id:Mapped[str] = mapped_column(String(128), primary_key=True, nullable=False)
    address: Mapped[str] = mapped_column(String(60), nullable=False)
    store_name: Mapped[str] = mapped_column(String(60), nullable=False)
    brand_name: Mapped[str] = mapped_column(String(60), nullable=False)
    first_name: Mapped[str] = mapped_column(String(60), nullable=False)  
    last_name: Mapped[str] = mapped_column(String(60), nullable=False)  
    email: Mapped[str] = mapped_column(String(60), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(60), nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=True)
    image_url: Mapped[str] = mapped_column(String(255), nullable=True)
    created_at:Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    def to_dict(self):
        """Serializes the class object to dictionary"""
        restaurant_dict = self.__dict__.copy()

        if restaurant_dict.get('_sa_instance_state'):
            del restaurant_dict['_sa_instance_state']
        return restaurant_dict