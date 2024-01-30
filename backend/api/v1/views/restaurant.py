from flask import jsonify, request
from models import app, db
from models.restaurant import Restaurant
import datetime
import uuid


@app.route('/restaurants', methods=['GET', 'POST'])
def get_or_post_restaurants():
    if request.method == 'GET':
        restaurants = db.session.execute(db.select(Restaurant)).scalars().all()
        restaurant_list = [restaurant.to_dict() for restaurant in restaurants]
        return jsonify(restaurants=restaurant_list)
    restaurant_id = str(uuid.uuid4())
    store_name = request.form['store_name']
    brand_name = request.form['brand_name']
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    email = request.form['email']
    password = request.form['password']
    phone = request.form['phone']
    image_url = request.form['image_url']
    address = request.form['address']
    new_restaurant = Restaurant(
        id=restaurant_id,
        store_name=store_name,
        brand_name=brand_name,
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=password,
        phone=phone,
        image_url=image_url,
        address=address
    ) 

    db.session.add(new_restaurant)
    db.session.commit()
    return jsonify({"Success": "Restaurant has been successfully created."})
