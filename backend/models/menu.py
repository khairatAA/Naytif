#!/usr/bin/python3
"""The Menu Model"""
from sqlalchemy import String, DateTime, Text, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from models import db
from datetime import datetime
import uuid


class Menu(db.Model):
    """The Menu class"""
    __tablename__ = "menu_items"
    id:Mapped[str] = mapped_column(String(128), primary_key=True, nullable=False)
    name: Mapped[str] = mapped_column(String(60), nullable=False, unique=True)
    price: Mapped[int] = mapped_column(Integer, nullable=False)
    category: Mapped[str] = mapped_column(String(60), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)  
    image_url: Mapped[str] = mapped_column(String(255), nullable=True)
    created_at:Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    restaurant = relationship("Restaurant", back_populates="menu_items")

    def to_dict(self):
        """Serializes the class object to dictionary"""
        menu_dict = self.__dict__.copy()

        if menu_dict.get('_sa_instance_state'):
            del menu_dict['_sa_instance_state']
        return menu_dict