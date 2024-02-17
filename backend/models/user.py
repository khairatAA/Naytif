#!/usr/bin/python3
""" This is a python module that has one class

Class: 
User - Inherits from the BaseModel class and db.Model class
"""
from datetime import datetime

from sqlalchemy import String, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from models.base_model import BaseModel
from models import db


class User(BaseModel, db.Model):
    """Model for user table which stores users' information

    Columns:
    
    id - [str] randomly generated uuid which is the primary key
    created_at - [datetime] the time user was created, default is now
    updated_at - [datetime] the time user was updated, default is now
    first_name - [string] first name of the user
    last_name - [string] last name of the user
    email - [string] email address, cannot be null and must unique
    password - [string] user password, cannot be null
    phone - [string] user's phone number, can be null
    image_url - [string] url of user's profile picture, can be null
    delivery_details - [list] list of user's delivery details from
    delivery details table
    orders - [list] list of orders made by the user.
    """
    __tablename__ = "users"
    first_name: Mapped[str] = mapped_column(String(60), nullable=False)  
    last_name: Mapped[str] = mapped_column(String(60), nullable=False)  
    email: Mapped[str] = mapped_column(String(60), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(60), nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=True)
    image_url: Mapped[str] = mapped_column(String(255), nullable=True)
    delivery_details = relationship('DeliveryDetails', back_populates="user", cascade="all, delete-orphan")
    orders = relationship("Order", back_populates="user", cascade="all, delete-orphan")