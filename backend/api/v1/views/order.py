
#!/usr/bin/python3
from flask import jsonify, request
from models import app, db
from models.menu import Menu
from models.order import Order
import datetime
import uuid



# /api/v1/view/orders
# GET: Get a list of all orders.
# POST: Create an order
@app.route('/orders', methods=['GET'])
def get_or_post_orders():
    """ Get all orders or create an order depending on the method"""
    if request.method == 'GET':
        orders = db.session.execute(db.select(Order)).scalars().all()
        order_list = [order.to_dict() for order in orders]
        return jsonify(orders=order_list)
    # order_id = str(uuid.uuid4())
    # driver_id = request.form['driver_id']
    # user_id = request.form['user_id']
    # menu_item_id = request.form['menu_item_id']
    # number_of_order = request.form['number_of_order']
    # menu_item = db.get_or_404(Menu, menu_item_id)
    # subtotal = float(menu_item.price) * float(number_of_order)
    # restaurant_id = menu_item.restaurant_id
    # new_order = Order(
    #     id=order_id,
    #     driver_id=driver_id,
    #     user_id=user_id,
    #     menu_item_id=menu_item_id,
    #     restaurant_id=restaurant_id,
    #     number_of_order=number_of_order,
    #     subtotal=subtotal,
    #     order_list_id=order_list_id
    # ) 

    # db.session.add(new_order)
    # db.session.commit()
    return jsonify({"Success": "Order has been successfully created."})


# /api/v1/view/orders/<int:id>
# GET: Get information about a specific order.
# Put: Update an order status
# /api/v1/view/order/<int:id>

@app.route('/orders/<order_id>', methods=['GET', 'PATCH', 'DELETE'])
def order_by_id(order_id):
    """ Get order by id"""
    try:
        order = db.get_or_404(Order, order_id)
    except Exception:
        return jsonify({'error': 'order not found'})
    
    # get order information
    if request.method == 'GET':
        order_dict = order.to_dict()
        return jsonify(order=order_dict)
    
    # update order information
    if request.method == 'PATCH':
        json_data = request.get_json()
        if json_data.get('number_of_order'):
            order.number_of_order = json_data['number_of_order']
            order.updated_at = datetime.datetime.now()
        if json_data.get('order_status'):
            order.order_status = json_data['order_status']
            order.updated_at = datetime.datetime.now()
        db.session.commit()
        return jsonify({"Success": "Successfully updated the order."})
    
    # delete order
    db.session.delete(order)
    db.session.commit()
    return jsonify({'Success': 'order successfully deleted.'})