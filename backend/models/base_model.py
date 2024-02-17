#!/usr/bin/python3
""" This is a python module that has class

classes:
BaseModel - the base model for other models
"""
from datetime import datetime
import uuid

from sqlalchemy import DateTime, String
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from models import db


class BaseModel():
    """Base model that combines the common method and properties
    
    Properties:
    id - [str] randomly generated uuid
    created_at - [datetime] the date and time object is created
    updated_at - [datetime] the date and time object is last updated.
    Methods:
    to_dict - creates and returns a dictionary of all attributes
    of the object excluding password property.
    save - stores the instance on the database.
    update - updates values of instance attributes.
    delete - deletes and instance from the database.
    """
    id: Mapped[str] = mapped_column(String(60), primary_key=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    def __init__(self, *args, **kwargs):
        """ Intialises instance attributes
        """
        if kwargs:
            for key, value in kwargs.items():
                setattr(self, key, value)
        self.id = str(uuid.uuid4())
        self.created_at = datetime.now()
        self.updated_at = self.created_at

    def to_dict(self):
        """Returns a dictionary with all fields and their values"""
        dictionary = {}

        for column in self.__table__.columns:
            dictionary[column.name] = getattr(self, column.name)
        
        if dictionary.get('password'):
            del dictionary['password']
        return dictionary
    
    def save(self):
        """Saves the instance on the database"""
        # add instance to the database session
        db.session.add(self)
        # commit changes in the session to the database.
        db.session.commit()
    
    def update(self, **kwargs):
        """Takes kwargs of attributes and their new values
        and updates the database.

        Args: Keywords arguments
        Return: None
        """
        # For loop that iterates over the kwargs and set each
        # attribute of the instance (kwargs' key) to the key's value.
        for key, value in kwargs.items():
            setattr(self, key, value)

        db.session.commit()
    
    def delete(self):
        """Deletes the instance from the database."""
        # Mark the object for delete in the session
        db.session.delete(self)
        # Commit the changes to the database to carry out the delete.
        db.session.commit()