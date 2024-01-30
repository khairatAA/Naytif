#!/usr/bin/python3
"""App Module"""
from models import app
from api.v1.views.user import *

if __name__ == "__main__":
    app.run(debug=True)
