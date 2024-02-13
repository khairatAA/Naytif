from flask import jsonify, request
from models import app, db
from models.delivery import DeliveryDetails
import datetime
import uuid


@app.route('/delivery_details')
def get_delivery_details():
    """Get all delivery details in the database"""
    if request.method == 'GET':
        delivery_details = db.session.execute(db.select(DeliveryDetails)).scalars().all()
        delivery_details_list = []
        for delivery_details in delivery_details:
            delivery_details_list.append(delivery_details.to_dict())
        return jsonify(delivery_details=delivery_details_list)


@app.route('/delivery_details', methods=['POST'])
def create_delivery_details():
    """Create a delivery detail"""
    user_id = request.form['user_id']
    phone = request.form['phone']
    address = request.form['address']
    if user_id and phone and  address:
        new_delivery_details = DeliveryDetails(
            id=str(uuid.uuid4()),
            user_id=user_id,
            phone=phone,
            address=address
        )
        db.session.add(new_delivery_details)
        db.session.commit()
        return jsonify({"Success": "Successfully added delivery details"})
    return jsonify(error={"error": "invalid entry"})


@app.route('/delivery_details/<delivery_details_id>', methods=['GET', 'PATCH', 'DELETE'])
def delivery_details_by_id(delivery_details_id):
    """ Get delivery detail by id"""
    try:
        delivery_details = db.get_or_404(DeliveryDetails, delivery_details_id)
    except Exception:
        return jsonify({'error': 'delivery_details not found'})
    
    # get delivery_details information
    if request.method == 'GET':
        delivery_details_dict = delivery_details.to_dict()
        return jsonify(delivery_details=delivery_details_dict)
    
    # update delivery_details information
    if request.method == 'PATCH':
        if request.form.get('phone'):
            phone = request.form['phone']
            delivery_details.phone = phone
        delivery_details.updated_at = datetime.datetime.now()
        db.session.commit()
        return jsonify({"Success": "Successfully updated the delivery_details."})
    
    # delete delivery_details
    db.session.delete(delivery_details)
    db.session.commit()
    return jsonify({'Success': 'delivery_details successfully deleted.'})