
#!/usr/bin/python3
from flask import jsonify, request
from models import app, db
from models.menu import Menu
from models.order import Order
import datetime
import uuid



# /api/v1/view/orders
# GET: Get a list of all orders.
@app.route('/orders', methods=['GET', 'POST'])
def get_or_post_orders():
    if request.method == 'GET':
        orders = db.session.execute(db.select(Order)).scalars().all()
        order_list = [order.to_dict() for order in orders]
        return jsonify(orders=order_list)
    order_id = str(uuid.uuid4())
    driver_id = request.form['driver_id']
    user_id = request.form['user_id']
    menu_item_id = request.form['menu_item_id']
    number_of_order = request.form['number_of_order']
    menu_item = db.get_or_404(Menu, menu_item_id)
    subtotal = float(menu_item.price) * float(number_of_order)
    restaurant_id = menu_item.restaurant_id
    new_order = Order(
        id=order_id,
        driver_id=driver_id,
        user_id=user_id,
        menu_item_id=menu_item_id,
        restaurant_id=restaurant_id,
        number_of_order=number_of_order,
        subtotal=subtotal
    ) 

    db.session.add(new_order)
    db.session.commit()
    return jsonify({"Success": "Order has been successfully created."})



# /api/v1/view/orders/<int:id>
# GET: Get information about a specific order.


# /api/v1/view/orders
# POST: Create an order


# /api/v1/view/orders/<int:id>/status
# Put: Update an order status


# /api/v1/view/order/<int:id>
# DELETE: Cancel an order

