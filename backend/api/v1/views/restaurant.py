from flask import jsonify, request, render_template, flash, url_for, redirect
from models import app, db
from models.restaurant import Restaurant
from models.menu import Menu
from models.order import Order
from models.blocked_token import TokenBlocklist
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    jwt_required,
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    get_jwt,
    current_user,
    decode_token
)
import datetime
import smtplib
import uuid

#GET: Get a list of all restaurants
#POST: Create a new restaurant.
@app.route('/restaurants/all', methods=['GET'])
@jwt_required(optional=True)
def get_restaurants():
    """ Return all restaurant in the database"""
    restaurants = db.session.execute(db.select(Restaurant)).scalars().all()
    restaurant_list = [restaurant.to_dict() for restaurant in restaurants]
    current_user = get_jwt_identity()
    return jsonify(restaurants=restaurant_list)


@app.route('/restaurants/register', methods=['POST'])
def post_restaurant():
    """ Creates new restaurant if the email doesn't exist in
    the database with details provided"""
    restaurant_id = str(uuid.uuid4())
    store_name = request.form['store_name']
    brand_name = request.form['brand_name']
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    email = request.form['email']
    restaurant = db.session.execute(db.select(Restaurant).where(Restaurant.email==email)).scalar()
    if restaurant:
        return jsonify(msg="Restaurant already exist with this email"), 400
    password = request.form['password']
    password = generate_password_hash(password, method="pbkdf2:sha256", salt_length=8)
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
    return jsonify({"Success": "Restaurant has been successfully created."}), 201


@app.route('/restaurants/login', methods=['POST'])
def login():
    """ login restaurant with valid credentials"""
    email = request.form.get('email', None)
    password = request.form.get('password', None)
    if not email or not password:
        return jsonify({"msg": "Invalid email or password"}), 401
    restaurant = db.session.execute(db.select(Restaurant).where(Restaurant.email==email)).scalar()
    if not restaurant:
        return ({"msg": "Restaurant doesn't exist."}), 401
    is_valid = check_password_hash(restaurant.password, password)
    if not is_valid:
        return jsonify({"msg": "Incorrect password"}), 401
    # login here
    # generate token
    access_token = create_access_token(identity=restaurant, additional_claims={"role": "Restaurant"})
    return jsonify({"access_token":access_token, "restaurant_id": restaurant.id})


@app.route('/restaurants/logout', methods=['DELETE'])
@jwt_required()
def restaurant_logout():
    """ Logs user out and blocks its access token"""
    jti = get_jwt()['jti']
    blocked_token = TokenBlocklist(
        id=str(uuid.uuid4()),
        jti=jti
    )
    db.session.add(blocked_token)
    db.session.commit()
    return jsonify({"msg": "JWT revoked"})



# /api/v1/view/restaurants/<int:id>
@app.route('/restaurants/<restaurant_id>')
def restaurant_by_id(restaurant_id):
    """ Returns specific restaurant based on id 
    otherwise 404 if the restaurant doesn't exist
    """
    try:
        restaurant = db.get_or_404(Restaurant, restaurant_id)
    except Exception:
        return jsonify({'error': 'Restaurant not found'})
    
    # get restaurant information
    restaurant_dict = restaurant.to_dict()
    return jsonify(restaurant=restaurant_dict)

# /api/v1/view/restaurants/<int:id>
@app.route('/restaurants/<restaurant_id>/orders')
def restaurant_order_by_id(restaurant_id):
    """ Returns specific restaurant based on id 
    otherwise 404 if the restaurant doesn't exist
    """
    try:
        restaurant = db.get_or_404(Restaurant, restaurant_id)
    except Exception:
        return jsonify({'error': 'Restaurant not found'})
    orders = db.session.execute(db.select(Order)).scalars().all()
    users = [order.user for order in orders if order.restaurant_id == restaurant_id]
    users_list = []
    for user in users:
        if user not in users_list:
            users_list.append(user)
    restaurant_orders = []

    # for order in restaurant_orders:
    #     try:
    #         user = db.get_or_404('User', order.user_id)
    #     except Exception:
    #         return jsonify(msg="User does not exist")
    for user in users_list:
        orders = user.orders
        orders = [order for order in orders if order.restaurant_id == restaurant_id]
        delivery_details = user.delivery_details[0] if user.delivery_details[0] else None
        order_list = []
        items = []
        for order in orders:
            menu_item = order.menu_items
            items.append({
                "itemId": menu_item.id,
                "name": menu_item.name,
                "quantity": order.number_of_order,
                "price": order.subtotal
            })
        unique_items = [] # [item['id'] for item in items]
        unique_items_ids = [] # list(set(item_ids))
        for item in items:
            if item['itemId'] not in unique_items_ids:
                unique_items.append(item)
                unique_items_ids.append(item['itemId'])
        user_order = {
            "id": order.id,
            "user": {
                "id": user.id,
                "name": f"{user.first_name} {user.last_name}"
            },
            "deliveryAddress": delivery_details.address,
            "items": unique_items
        }
        restaurant_orders.append(user_order)
    return jsonify(orders=restaurant_orders)

    

# TODO: Add authentication to this route
# /api/v1/view/restaurants/<int:id>
@app.route('/restaurants/<restaurant_id>', methods=['PATCH', 'DELETE'])
@jwt_required()
def put_or_delete_restaurant(restaurant_id):
    """ Deletes or udpates a specific restaurant if it exist
     otherwise 404 """
    # current_restaurant = get_jwt_identity()
    claims = get_jwt()
    role = claims.get('role')
    if role != 'Restaurant':
        return jsonify(msg="Access forbidden"), 403
    try:
        restaurant = db.get_or_404(Restaurant, restaurant_id)#, 404
    except Exception:
        return jsonify({'error': 'Restaurant not found'})

    # update restaurant information
    if request.method == 'PATCH':
        json_data = request.get_json()
        count = 0
        if json_data.get('brand_name'):
            restaurant.brand_name = json_data.get('brand_name')
            count += 1
        if json_data.get('store_name'):
            restaurant.store_name = json_data.get('store_name')
            count += 1
        if json_data.get('address'):
            restaurant.address = json_data.get('address')
            count += 1
        if json_data.get('first_name'):
            restaurant.first_name = json_data.get('first_name')
            count += 1
        if json_data.get('last_name'):
            restaurant.last_name = json_data.get('last_name')
            count += 1
        if json_data.get('phone'):
            phone = json_data['phone']
            restaurant.phone = phone
            count += 1
        if json_data.get('image_url'):
            image_url = json_data['image_url']
            restaurant.image_url = image_url
            count += 1
        if count == 0:
            return jsonify(msg="No data provided.")
        restaurant.updated_at = datetime.datetime.now()
        db.session.commit()
        return jsonify({"Success": "Successfully updated the restaurant."})
    
    # delete restaurant
    db.session.delete(restaurant)
    db.session.commit()
    jti = get_jwt()['jti']
    blocked_token = TokenBlocklist(
        id=str(uuid.uuid4()),
        jti=jti
    )
    db.session.add(blocked_token)
    db.session.commit()
    return jsonify({'Success': 'restaurant successfully deleted.'})


# /api/v1/view/restaurants/<int:id>/menu
# GET: Get the menu for a specific restaurant.
@app.route('/restaurants/<restaurant_id>/menu')
def get_or_post_menu(restaurant_id):
    try:
        restaurant = db.get_or_404(Restaurant, restaurant_id)
    except Exception:
        return jsonify({'msg': "Restaurant not found."}), 404
    restaurant_menu_items = [menu_item.to_dict() for menu_item in restaurant.menu_items]
    return jsonify(menu=restaurant_menu_items)

# TODO: Add authentication
# POST: Add a new menu item to a restaurant.
@app.route('/restaurants/<restaurant_id>/menu', methods=['POST'])
@jwt_required()
def post_menu_item(restaurant_id):
    # current_restaurant = get_jwt_identity()
    claims = get_jwt()
    role = claims.get('role')
    if role != 'Restaurant':
        return jsonify(msg="Access forbidden"), 403
    try:
        restaurant = db.get_or_404(Restaurant, restaurant_id)
    except Exception:
        return jsonify({'msg': "Restaurant not found."})
    name = request.form['name']
    price = request.form['price']
    category = request.form['category']
    description = request.form['description']
    image_url =  request.form.get('image_url')
    new_menu_item = Menu(
        id=str(uuid.uuid4()),
        restaurant_id=restaurant_id,
        name=name,
        price=float(price),
        category=category,
        description=description,
        image_url=image_url
    )
    db.session.add(new_menu_item)
    db.session.commit()
    return jsonify({"Success": "Restaurant menu item created."}), 201


# /api/v1/view/restaurants/<int:id>/menu/<int:item_id>
@app.route('/restaurants/<restaurant_id>/menu/<menu_item_id>')
def get_menu_item(restaurant_id, menu_item_id):
    try:
        restaurant = db.get_or_404(Restaurant, restaurant_id)
    except Exception:
        return jsonify({'msg': 'restaurant not found'}), 404
    
    try:
        menu_item = db.get_or_404(Menu, menu_item_id)
    except Exception:
        return jsonify({'msg': 'Menu item not found.'}), 404
    
    if menu_item.restaurant_id != restaurant_id:
        return jsonify({'msg': 'Menu item not found'}), 404
    
    # get restaurant information
    menu_item_dict = menu_item.to_dict()
    return jsonify(menu_item_dict=menu_item_dict)


# TODO: Add authentication
# /api/v1/view/restaurants/<int:id>/menu/<int:item_id>
# PUT: Update information about a menu
# DELETE: Delete a menu item.
@app.route('/restaurants/<restaurant_id>/menu/<menu_item_id>', methods=['PATCH', 'DELETE'])
@jwt_required()
def patch_or_delete_menu_item(restaurant_id, menu_item_id):
    # current_restaurant = get_jwt_identity()
    claims = get_jwt()
    role = claims.get('role')
    if role != 'Restaurant':
        return jsonify(msg="Access forbidden"), 403
    try:
        restaurant = db.get_or_404(Restaurant, restaurant_id)
    except Exception:
        return jsonify({'error': 'restaurant not found'}), 404
    
    try:
        menu_item = db.get_or_404(Menu, menu_item_id)
    except Exception:
        return jsonify({'msg': 'Menu item not found.'}), 404
    
    if menu_item.restaurant_id != restaurant_id:
        return jsonify({'msg': 'Menu item not found'}), 404
    
    # update restaurant information
    if request.method == 'PATCH':
        json_data = request.get_json()
        count = 0
        if json_data.get('name'):
            menu_item.name = json_data['name']
            count += 1
        if json_data.get('image_url'):
            image_url = json_data['image_url']
            menu_item.image_url = image_url
            count += 1
        if json_data.get('description'):
            menu_item.description = json_data['description']
            count += 1
        if json_data.get('price'):
            menu_item.price = float(json_data['price'])
            count += 1
        if json_data.get('category'):
            menu_item.category = json_data['category']
            count += 1
        if count < 1:
            return jsonify(msg="No data provided.")
        menu_item.updated_at = datetime.datetime.now()
        db.session.commit()
        return jsonify({"Success": "Successfully updated the restaurant menu item."})
    
    # delete restaurant
    db.session.delete(menu_item)
    db.session.commit()
    return jsonify({'Success': 'restaurant menu item successfully deleted.'})

@app.route('/restaurants/<restaurant_id>/orders')
@jwt_required()
def restaurant_orders():
    pass

@app.route('/restaurants/forgot', methods=['POST'])
def restaurant_forgot_password():
    email = request.get_json()['email']
    restaurant = db.session.execute(db.select(Restaurant).where(Restaurant.email==email)).scalar()
    if not restaurant:
        return jsonify(msg="Restaurant not founnd"), 404
    reset_token = create_access_token(identity=restaurant)
    reset_link = request.host_url + 'restaurants/reset/' + reset_token
    name = f"{restaurant.first_name} {restaurant.last_name}"
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


@app.route('/restaurants/reset/<reset_token>', methods=['GET', 'PATCH'])
def restaurant_reset_password(reset_token):
     if request.method == 'POST':
        print("Post is true")
        restaurant_id = decode_token(reset_token)['sub']
        try:
            restaurant = db.get_or_404(Restaurant, restaurant_id)
        except Exception:
            return jsonify(msg="Bad token")
        
        password = request.form['password']
        confirm_password =request.form['confirm_password']
        if password != confirm_password:
            flash("Password doesn't match")
            return redirect(url_for('restaurant_reset_password', reset_token=reset_token))
        restaurant.password = generate_password_hash(password=password, method="pbkdf2:sha256", salt_length=8)
        db.session.commit()
        return render_template('password_changed.html')
     return render_template('reset_password.html')

# This area is purely to test my authentication
@app.route('/protected')
@jwt_required()
def protected():
    current_restaurant = current_user
    claims = get_jwt()
    role = claims.get('role')
    if role != 'Restaurant':
        return jsonify(msg="Access forbidden"), 403
    return jsonify(logged_in_as=current_restaurant.brand_name)
