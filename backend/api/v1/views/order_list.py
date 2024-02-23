from flask import jsonify, request
from models import app, db
from models.restaurant import Restaurant
from models.menu import Menu
from models.order_list import OrderList
from models.blocked_token import TokenBlocklist
from models.order import Order
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    jwt_required,
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    get_jwt,
    current_user
)
import datetime
import uuid
import random


@app.route('/orders', methods=['POST'])
def make_orders():
    """
    {
        userId: "668wgx67839303032',
        items: [
            {
                itemId: "537892xkxdk739",
                quantity: 12
            },
            {
                itemId: "537892xkxdk739",
                quantity: 12
            }
        ]
    }
    """
    json_data = request.get_json()
    user_id = json_data.userId
    orders = json_data.items
    drivers_list = requests.get(request.url_root + '/drivers').json()['drivers']
    driver = random.choice(drivers_list)
    order_list = []
    order_list_id = str(uuid.uuid4())
    new_order_list = OrderList(id=order_list_id)
    for order in orders:
        menu_item_id = order.itemId
        try:
            menu_item = db.get_or_404(Menu, menu_item_id)
        except Exception:
            return jsonify(msg="Menu item not found."), 400
        quantity = order.quantity
        order_id = str(uuid.uuid4())
        subtotal = float(menu_item.price) * float(quantity)
        new_order = Order(
            id=order_id,
            driver_id=driver.id,
            user_id=user_id,
            menu_item_id=menu_item_id,
            restaurant_id=menu_item.restaurant_id,
            number_of_order=quantity,
            subtotal=subtotal,
            order_list_id=order_list_id
        )
        order_list.append(new_order)
    db.session.add(new_order_list)
    db.session.add_all(order_list)
    db.session.commit()