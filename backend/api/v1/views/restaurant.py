from flask import jsonify, request
from models import app, db
from models.restaurant import Restaurant
from models.menu import Menu
import datetime
import uuid

#GET: Get a list of all restaurants
#POST: Create a new restaurant.
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

# /api/v1/view/restaurants/<int:id>
# PUT: Update restaurant information.
# DELETE: Delete a restaurant.
@app.route('/restaurants/<restaurant_id>', methods=['GET', 'PATCH', 'DELETE'])
def restaurant_by_id(restaurant_id):
    try:
        restaurant = db.get_or_404(Restaurant, restaurant_id)
    except Exception:
        return jsonify({'error': 'Restaurant not found'})
    
    # get restaurant information
    if request.method == 'GET':
        restaurant_dict = restaurant.to_dict()
        return jsonify(restaurant=restaurant_dict)
    
    # update restaurant information
    if request.method == 'PATCH':
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
    return jsonify({'Success': 'restaurant successfully deleted.'})


# /api/v1/view/restaurants/<int:id>/menu
# GET: Get the menu for a specific restaurant.
# POST: Add a new menu item to a restaurant.
@app.route('/restaurants/<restaurant_id>/menu', methods=['GET', 'POST'])
def get_or_post_menu(restaurant_id):
    try:
        restaurant = db.get_or_404(Restaurant, restaurant_id)
    except Exception:
        return jsonify({'error': "Restaurant not found."})
    if request.method == 'POST':
        name = request.form['name']
        price = request.form['price']
        category = request.form['category']
        description = request.form['description']
        new_menu_item = Menu(
            id=str(uuid.uuid4()),
            restaurant_id=restaurant_id,
            name=name,
            price=float(price),
            category=category,
            description=description,
        )
        db.session.add(new_menu_item)
        db.session.commit()
        return jsonify({"Success": "Restaurant menu item created."})
    restaurant_menu_items = [menu_item.to_dict() for menu_item in restaurant.menu_items]
    return jsonify(menu=restaurant_menu_items)


# /api/v1/view/restaurants/<int:id>/menu/<int:item_id>
# PUT: Update information about a menu
# DELETE: Delete a menu item.
@app.route('/restaurants/<restaurant_id>/menu/<menu_item_id>', methods=['GET', 'PATCH', 'DELETE'])
def menu_item_by_id(restaurant_id, menu_item_id):
    try:
        restaurant = db.get_or_404(Restaurant, restaurant_id)
    except Exception:
        return jsonify({'error': 'restaurant not found'})
    
    try:
        menu_item = db.get_or_404(Menu, menu_item_id)
    except Exception:
        return jsonify({'error': 'Menu item not found.'})
    
    if menu_item.restaurant_id != restaurant_id:
        return jsonify({'error': 'Menu item not found'})
    
    # get restaurant information
    if request.method == 'GET':
        menu_item_dict = menu_item.to_dict()
        return jsonify(menu_item_dict=menu_item_dict)
    
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