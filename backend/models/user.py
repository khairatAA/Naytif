#!/usr/bin/python3
"""The user model"""
from sqlalchemy import String, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from models import db
from datetime import datetime
import uuid


class User(db.Model):
    """ User class """
    __tablename__ = "users"
    id:Mapped[str] = mapped_column(String(128), primary_key=True, nullable=False)
    first_name: Mapped[str] = mapped_column(String(60), nullable=False)  
    last_name: Mapped[str] = mapped_column(String(60), nullable=False)  
    email: Mapped[str] = mapped_column(String(60), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(60), nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=True)
    image_url: Mapped[str] = mapped_column(String(255), nullable=True)
    created_at:Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    delivery_details = relationship('DeliveryDetails', back_populates="user")
    orders = relationship("Order", back_populates="user")

    def to_dict(self):
        """ Returns a dictionary with all fields and their values """
        user_dict = self.__dict__.copy()

        if user_dict.get('_sa_instance_state'):
            del user_dict['_sa_instance_state']
        return user_dict