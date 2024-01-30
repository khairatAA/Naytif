from flask import jsonify, request
from models import app, db
from models.user import User
import datetime
import uuid


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
        return jsonify({'error': 'User already exist'})
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
    return jsonify(error={"error": "invalid entry"})


@app.route('/users/<user_id>', methods=['GET', 'PATCH', 'DELETE'])
def user_by_id(user_id):
    try:
        user = db.get_or_404(User, user_id)
    except Exception:
        return jsonify({'error': 'user not found'})
    
    # get user information
    if request.method == 'GET':
        user_dict = user.to_dict()
        return jsonify(user=user_dict)
    
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