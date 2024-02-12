#!/usr/bin/python3
""" app initialisation module"""
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from sqlalchemy.orm import DeclarativeBase
from flask_cors import CORS
import os
from datetime import timedelta
from flask_jwt_extended import (create_access_token,
                                get_jwt_identity,
                                jwt_required,
                                JWTManager)

app = Flask(__name__)
CORS(app)

# App configurations
app.config['SECRET_KEY'] = os.getenv('FLASK_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DB', 'sqlite:///food_delivery.db')
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

# Declarative Base
class Base(DeclarativeBase):
    pass

# create Database instance and initialise the app 
db = SQLAlchemy(model_class=Base)
db.init_app(app)

from models.user import User
from models.restaurant import Restaurant
from models.menu import Menu
from models.delivery import DeliveryDetails
from models.order import Order
from models.driver import Driver
from models.blocked_token import TokenBlocklist

with app.app_context():
    db.create_all()