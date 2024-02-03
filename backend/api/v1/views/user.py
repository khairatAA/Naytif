from flask import jsonify, request
from models import app, db
from models.user import User
from models.blocked_token import TokenBlocklist
from werkzeug.security import check_password_hash, generate_password_hash
import datetime
import uuid
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    get_jwt,
    current_user
)


@app.route('/users')
def get_users():
    if request.method == 'GET':
        users = db.session.execute(db.select(User)).scalars().all()
        user_list = []
        for user in users:
            user_list.append(user.to_dict())
        return jsonify(users=user_list)


@app.route('/users', methods=['POST'])
def create_user():
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    email = request.form['email']
    password = request.form['password']
    phone = request.form['phone']
    image_url = request.form['image_url']
    user = db.session.execute(db.select(User).where(User.email == email)).scalar()
    if user:
        return jsonify({'msg': 'User already exist'}), 400
    if first_name and last_name and email and password:
        new_user = User(
            id=str(uuid.uuid4()),
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password,
            phone=phone,
            image_url=image_url
        )
        db.session.add(new_user)
        db.session.commit()
        user_dict = {
            'id': new_user.id,
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'password': password,
            'phone': phone,
            'image_url': image_url,
            'created_at': new_user.created_at,
            'updated_at': new_user.updated_at
        }
        return jsonify(user=user_dict)
    return jsonify(error={"msg": "Invalid entry"}), 400


@app.route('/users/<user_id>')
def get_user(user_id):
    try:
        user = db.get_or_404(User, user_id)
    except Exception:
        return jsonify({'msg': 'User not found'}), 404
    
    # get user information
    if request.method == 'GET':
        user_dict = user.to_dict()
        return jsonify(user=user_dict)
    

@app.route('/users/login', methods=['POST'])
def login_user():
    # login restaurant
    email = request.form.get('email', None)
    password = request.form.get('password', None)
    if not email or not password:
        return jsonify({"msg": "Invalid Entry"}), 400
    user = db.session.execute(db.select(User).where(email==email)).scalar()
    if not user:
        return ({"msg": "User doesn't exist."}), 404
    is_valid = check_password_hash(user.password, password)
    if not is_valid:
        return jsonify({"msg": "Incorrect password"}), 401
    # login here
    # generate token
    access_token = create_access_token(identity=user, additional_claims={"role": "User"})
    return jsonify(access_token=access_token)


@app.route('/users/logout', methods=['DELETE'])
@jwt_required()
def user_logout():
    jti = get_jwt()['jti']
    blocked_token = TokenBlocklist(
        id=str(uuid.uuid4()),
        jti=jti
    )
    db.session.add(blocked_token)
    db.session.commit()
    return jsonify({"msg": "JWT revoked"})


# TODO: Add authentication
@app.route('/users/<user_id>', methods=['PATCH', 'DELETE'])
def user_by_id(user_id):
    # current_user = get_jwt_identity()
    claims = get_jwt()
    role = claims.get('role')
    if role != 'User':
        return jsonify(msg="Access forbidden"), 403
    try:
        user = db.get_or_404(User, user_id)
    except Exception:
        return jsonify({'msg': 'User not found'}), 404
    # update user information
    if request.method == 'PATCH':
        if request.form.get('phone'):
            phone = request.form['phone']
            user.phone = phone
        if request.form.get('image_url'):
            image_url = request.form['image_url']
            user.image_url = image_url
        user.updated_at = datetime.datetime.now()
        db.session.commit()
        return jsonify({"Success": "Successfully updated the user."})
    
    # delete user
    db.session.delete(user)
    db.session.commit()
    return jsonify({'Success': 'User successfully deleted.'})


# This area is purely to test my authentication
@app.route('/users/protected')
@jwt_required()
def user_protected():
    current_restaurant = current_user
    claims = get_jwt()
    role = claims.get('role')
    if role != 'User':
        return jsonify(msg="Access forbidden"), 403
    return jsonify(logged_in_as=current_restaurant.first_name)