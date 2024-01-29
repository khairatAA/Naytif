from flask import jsonify
from models import app, db
from models.user import User

@app.route('/users')
def get_all_users():
    users = db.session.execute(User).all()
    user_list = []
    for user in users:
        user_list.append(user.to_dict())
    return jsonify(users=user_list)