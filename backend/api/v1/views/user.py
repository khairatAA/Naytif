from flask import jsonify, request, render_template, flash, url_for, redirect
from models import app, db
from models.user import User
from models.blocked_token import TokenBlocklist
from werkzeug.security import check_password_hash, generate_password_hash
import datetime
import smtplib
import uuid
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    get_jwt,
    decode_token,
    current_user
)


@app.route('/users')
def get_users():
    """ Gets all the users"""
    if request.method == 'GET':
        users = db.session.execute(db.select(User)).scalars().all()
        user_list = []
        for user in users:
            user_list.append(user.to_dict())
        return jsonify(users=user_list)


@app.route('/users', methods=['POST'])
def create_user():
    """ Creates user if the user doesn't exist"""
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    email = request.form['email']
    password = request.form['password']
    confirm_password = request.form['confirm_password']
    if password != confirm_password:
        return jsonify(msg="Password don't match"), 400
    user = db.session.execute(db.select(User).where(User.email == email)).scalar()
    if user:
        return jsonify({'msg': 'User already exist'}), 400
    if first_name and last_name and email and password:
        password = generate_password_hash(password=password, method="pbkdf2:sha256", salt_length=8)
        new_user = User(
            id=str(uuid.uuid4()),
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify(msg="User succesfully created."), 201
    return jsonify(error={"msg": "Invalid entry"}), 400


@app.route('/users/<user_id>')
def get_user(user_id):
    """Takes the id of the user and return the 
    user if it exist otherwise returns 404
    """
    try:
        user = db.get_or_404(User, user_id)
    except Exception:
        return jsonify({'msg': 'User not found'}), 404
    
    # get user information
    if request.method == 'GET':
        user_dict = user.to_dict()
        return jsonify(user=user_dict)
    
@app.route('/users/<user_id>/delivery_details', methods=['GET', 'PATCH'])
def get_user_delivery_details(user_id):
    """Takes the id of the user and return the 
    user if it exist otherwise returns 404
    """
    try:
        user = db.get_or_404(User, user_id)
    except Exception:
        return jsonify({'msg': 'User not found'}), 404
    
    # get user delivery details
    delivery_details = user.delivery_details
    if request.method == 'PATCH':
        number_of_delivery_details = len(delivery_details)
        if number_of_delivery_details > 0:
            delivery_detail = delivery_details[0]
            json_data = request.get_json()
            if json_data.get('address'):
                delivery_detail.address = json_data['address']
            if json_data.get('phone'):
                delivery_detail.phone = json_data['phone']
            db.session.commit()
            return jsonify(msg="delivery detail updated")
        else:
            return jsonify(msg="delivery detail doesn't exist"), 400
    delivery_details = [delivery_detail.to_dict() for delivery_detail in delivery_details]
    return jsonify(delivery_details=delivery_details)
    

@app.route('/users/login', methods=['POST'])
def login_user():
    """login user """
    # print(request.form)
    email = request.form.get('email', None)
    password = request.form.get('password', None)
    # print(email, password)
    if not email or not password:
        return jsonify({"msg": "Invalid Entry"}), 400
    user = db.session.execute(db.select(User).where(User.email==email)).scalar()
    if not user:
        return ({"msg": "User doesn't exist."}), 404
    is_valid = check_password_hash(user.password, password)
    if not is_valid:
        return jsonify({"msg": "Incorrect password"}), 401
    # login here
    # generate token
    access_token = create_access_token(identity=user, additional_claims={"role": "User"})
    return jsonify({"access_token": access_token, "user_id": user.id})


@app.route('/users/logout', methods=['DELETE'])
@jwt_required()
def user_logout():
    """ blocks the access token of the user """
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
@jwt_required()
def user_by_id(user_id):
    """Update or deletes user depending on the type of method"""
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
        count = 0
        json_data = request.get_json()
        if json_data.get('first_name'):
            user.first_name = json_data['first_name']
        if json_data.get('last_name'):
            user.last_name = json_data['last_name']
        if json_data.get('phone'):
            phone = json_data['phone']
            user.phone = phone
            count += 1
        if json_data.get('image_url'):
            image_url = json_data['image_url']
            user.image_url = image_url
            count += 1
        if count < 1:
            return jsonify(msg="No data provided.")
        user.updated_at = datetime.datetime.now()
        db.session.commit()
        return jsonify({"Success": "Successfully updated the user."})
    
    # delete user
    db.session.delete(user)
    jti = get_jwt()['jti']
    blocked_token = TokenBlocklist(
        id=str(uuid.uuid4()),
        jti=jti
    )
    db.session.add(blocked_token)
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


@app.route('/users/forgot', methods=['POST'])
def user_forgot_password():
    email = request.get_json()['email']
    user = db.session.execute(db.select(User).where(User.email==email)).scalar()
    if not user:
        return jsonify(msg="User not founnd"), 404
    reset_token = create_access_token(identity=user)
    reset_link = request.host_url + 'users/reset/' + reset_token
    name = f"{user.first_name} {user.last_name}"
    app_password = "uohsvsfnzyvhuglw"
    email_address = "python.omarj@gmail.com"
    message = f"Click on the follow link to reset your password: {reset_link}"
    email_message = f"Subject:Password Reset\n\nHello {name}\n{message}"
    with smtplib.SMTP("smtp.gmail.com", 587) as connection:
        connection.starttls()
        connection.login(email_address, app_password)
        connection.sendmail(email_address, email, email_message)
    return jsonify(msg="Email sent.")
    # return jsonify(reset_link=reset_link)


@app.route('/users/reset/<reset_token>', methods=['GET', 'POST'])
def user_reset_password(reset_token):
    if request.method == 'POST':
        print("Post is true")
        user_id = decode_token(reset_token)['sub']
        try:
            user = db.get_or_404(User, user_id)
        except Exception:
            return jsonify(msg="Bad token")
        
        password = request.form['password']
        confirm_password =request.form['confirm_password']
        if password != confirm_password:
            flash("Password doesn't match")
            return redirect(url_for('user_reset_password', reset_token=reset_token))
        user.password = generate_password_hash(password=password, method="pbkdf2:sha256", salt_length=8)
        db.session.commit()
        return render_template('password_changed.html')
    return render_template('reset_password.html')