#!/usr/bin/python3
"""The DeliveryDetails Model"""
from sqlalchemy import String, DateTime, Text, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from models import db
from datetime import datetime
import uuid


class DeliveryDetails(db.Model):
    """The Menu class"""
    __tablename__ = "delivery_details"
    id:Mapped[str] = mapped_column(String(128), primary_key=True, nullable=False)
    user_id:Mapped[str] = mapped_column(String(128), db.ForeignKey("users.id"))
    phone: Mapped[str] = mapped_column(String(20), nullable=True)
    address: Mapped[str] = mapped_column(Text, nullable=False)  
    user = relationship("Restaurant", back_populates="delivery_details")

    def to_dict(self):
        """Serializes the class object to dictionary"""
        menu_dict = self.__dict__.copy()

        if menu_dict.get('_sa_instance_state'):
            del menu_dict['_sa_instance_state']
        return menu_dict