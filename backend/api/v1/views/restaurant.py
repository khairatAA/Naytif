from flask import jsonify, request
from models import app, db
from models.restaurant import Restaurant
from models.menu import Menu
from models.blocked_token import TokenBlocklist
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    jwt_required,
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    get_jwt,
    decode_token,
    current_user
)
import datetime
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
    print(email, f'==>{password}<==')
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
        if request.form.get('brand_name'):
            restaurant.brand_name = restaurant.form.get('brand_name')
        if request.form.get('store_name'):
            restaurant.store_name = restaurant.form.get('store_name')
        if request.form.get('address'):
            restaurant.address_name = restaurant.form.get('address')

        if request.form.get('first_name'):
            restaurant.first_name = restaurant.form.get('first_name')

        if request.form.get('last_name'):
            restaurant.last_name = restaurant.form.get('last_name')
        if request.form.get('phone'):
            phone = request.form['phone']
            restaurant.phone = phone
        if request.form.get('image_url'):
            image_url = request.form['image_url']
            restaurant.image_url = image_url
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
        if request.form.get('name'):
            menu_item.name = request.form['name']
        if request.form.get('image_url'):
            image_url = request.form['image_url']
            menu_item.image_url = image_url
        if request.form.get('description'):
            menu_item.description = request.form['description']
        if request.form.get('price'):
            menu_item.price = float(request.form['price'])
        if request.form.get('category'):
            menu_item.category = request.form['category']
        menu_item.updated_at = datetime.datetime.now()
        db.session.commit()
        return jsonify({"Success": "Successfully updated the restaurant menu item."})
    
    # delete restaurant
    db.session.delete(menu_item)
    db.session.commit()
    return jsonify({'Success': 'restaurant menu item successfully deleted.'})


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


@app.route('/restaurants/forgot', methods=['POST'])
def restaurant_forgot_password():
    email = request.form['email']
    restaurant = db.session.execute(db.select(Restaurant).where(Restaurant.email==email)).scalar()
    if not restaurant:
        return jsonify(msg="User not founnd"), 404
    reset_token = create_access_token(identity=restaurant)
    reset_link = request.host_url + 'reset/' + reset_token
    return jsonify(reset_link=reset_link)


@app.route('/restaurants/reset/<reset_token>', methods=['PATCH'])
def restaurant_reset_password(reset_token):
    restaurant_id = decode_token(reset_token)['sub']
    try:
        restaurant = db.get_or_404(Restaurant, restaurant_id)
    except Exception:
        return jsonify(msg="Bad token")
    password = request.form['password']
    restaurant.password = generate_password_hash(password=password, method="pbkdf2:sha256", salt_length=8)
    db.session.commit()
    return jsonify(msg="Password reset successful")