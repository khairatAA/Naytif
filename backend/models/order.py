#!/usr/bin/python3
"""The Order Model"""
from sqlalchemy import String, DateTime, Text, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from models import db
from datetime import datetime
import uuid


class Order(db.Model):
    """The Order class"""
    __tablename__ = "orders"
    id:Mapped[str] = mapped_column(String(128), primary_key=True, nullable=False)
    menu_id:Mapped[str] = mapped_column(String(128), db.ForeignKey("menu_items.id"))
    restaurant_id:[str] = mapped_column(String(128), db.ForeignKey("restaurants.id"))
    user_id:Mapped[str] = mapped_column(String(128), db.ForeignKey("users.id"))
    driver_id:Mapped[str] = mapped_column(String(128), db.ForeignKey("drivers.id"))
    number_of_order: Mapped[int] = mapped_column(Integer, nullable=False)
    price: Mapped[int] = mapped_column(Integer, nullable=False)
    order_status: Mapped[str] = mapped_column(String(60), default="Preparing")
    created_at:Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    menu_items = relationship("Menu", back_populates="order")
    restaurant = relationship("Restaurant", back_populates="order")
    user = relationship("User", back_populates="orders")
    order = relationship("Driver", back_populates="orders")

    def to_dict(self):
        """Serializes the class object to dictionary"""
        order_dict = self.__dict__.copy()

        if order_dict.get('_sa_instance_state'):
            del order_dict['_sa_instance_state']
        return order_dict