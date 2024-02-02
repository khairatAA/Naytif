#!/usr/bin/python3
"""The DeliveryDetails Model"""
from sqlalchemy import String, DateTime, Text, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from models import db

class Address(db.Model):
    """The Address class"""
    __tablename__ = "addresses"
    id:Mapped[str] = mapped_column(String(128), primary_key=True, nullable=False)
    user_id:Mapped[str] = mapped_column(String(128), db.ForeignKey("users.id"), unique=True)
    address: Mapped[str] = mapped_column(Text, nullable=False)  
    user = relationship("User", back_populates="address")

    def to_dict(self):
        """Serializes the class object to dictionary"""
        dict = self.__dict__.copy()

        if dict.get('_sa_instance_state'):
            del dict['_sa_instance_state']
        return dict