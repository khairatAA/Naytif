#!/usr/bin/python3
""" This is a python module that has one class

Class: 
Restaurant - Inherits from the BaseModel class and db.Model class
"""
from datetime import datetime

from sqlalchemy import String, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from models import db


class Restaurant(db.Model):
    """Model for restaurant table which stores restaurants' information

    Columns:
    
    id - [str] randomly generated uuid which is the primary key
    created_at - [datetime] the time restaurant was created, default is now
    updated_at - [datetime] the time restaurant was updated, default is now
    first_name - [string] first name of the restaurant creator
    last_name - [string] last name of the restaurant creator
    store_name - [string] the name of the restaurant.
    brand_name - [string] the name of the restaurant as it will appear
    online
    email - [string] email address, cannot be null and must unique
    password - [string] restaurant creator password, cannot be null
    phone - [string] restaurant creator's phone number, can be null
    image_url - [string] url of restaurant's profile picture, can be null
    orders - [list] list of orders made to the restaurants.
    menu_items - [list] list of items on the restaurant's menu.
    """
    __tablename__ = "restaurants"
    id: Mapped[str] = mapped_column(String(128), primary_key=True, nullable=False)
    address: Mapped[str] = mapped_column(String(60), nullable=False)
    store_name: Mapped[str] = mapped_column(String(60), nullable=False)
    brand_name: Mapped[str] = mapped_column(String(60), nullable=False)
    first_name: Mapped[str] = mapped_column(String(60), nullable=False)  
    last_name: Mapped[str] = mapped_column(String(60), nullable=False)  
    email: Mapped[str] = mapped_column(String(60), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(60), nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=True)
    image_url: Mapped[str] = mapped_column(String(255), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    menu_items = relationship("Menu", back_populates="restaurant")
    orders = relationship("Order", back_populates="restaurant")