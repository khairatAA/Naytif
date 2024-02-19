#!/usr/bin/python3
"""App Module"""
from models import app
from flask_jwt_extended import JWTManager, get_jwt


jwt = JWTManager(app)

# Register a callback function that takes whatever object is passed in as the
# identity when creating JWTs and converts it to a JSON serializable format.
@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id


# Register a callback function that loads a user from your database whenever
# a protected route is accessed. This should return any python object on a
# successful lookup, or None if the lookup failed for any reason (for example
# if the user has been deleted from the database).
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    role = jwt_data.get('role')
    if role == 'Restaurant':
        return Restaurant.query.filter_by(id=identity).one_or_none()
    return User.query.filter_by(id=identity).one_or_none()


# Callback function to check if a JWT exists in the database blocklist
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = TokenBlocklist.query.filter_by(jti=jti).one_or_none()
    return token is not None


from api.v1.views.user import *
from api.v1.views.restaurant import *
from api.v1.views.order import *
from api.v1.views.driver import *
from api.v1.views.delivery import *

if __name__ == "__main__":
    app.run(debug=True)
