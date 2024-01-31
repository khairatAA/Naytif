#!/usr/bin/python3
"""App Module"""
from models import app
from api.v1.views.user import *
from api.v1.views.restaurant import *
from api.v1.views.order import *
from api.v1.views.driver import *

if __name__ == "__main__":
    app.run(debug=True)
