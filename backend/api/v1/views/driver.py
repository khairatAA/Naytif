from flask import jsonify, request
from models import app, db
from models.driver import Driver
import datetime
import uuid


@app.route('/drivers')
def get_drivers():
    """Gets all the drivers in the database"""
    if request.method == 'GET':
        drivers = db.session.execute(db.select(Driver)).scalars().all()
        driver_list = []
        for driver in drivers:
            driver_list.append(driver.to_dict())
        return jsonify(drivers=driver_list)


@app.route('/drivers', methods=['POST'])
def create_driver():
    """ Create a driver"""
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    email = request.form['email']
    phone = request.form['phone']
    vehicle_type = request.form['vehicle_type']
    driver = db.session.execute(db.select(Driver).where(Driver.email == email)).scalar()
    if driver:
        return jsonify({'msg': 'Driver already exist'}), 400
    if first_name and last_name and email:
        new_driver = Driver(
            id=str(uuid.uuid4()),
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone=phone,
            vehicle_type=vehicle_type
        )
        db.session.add(new_driver)
        db.session.commit()

        return jsonify(msg="Driver successfully created."), 201
    return jsonify(error={"error": "invalid entry"})


@app.route('/drivers/<driver_id>', methods=['GET', 'PATCH', 'DELETE'])
def driver_by_id(driver_id):
    """Get, update, or delete a driver base on method"""
    try:
        driver = db.get_or_404(Driver, driver_id)
    except Exception:
        return jsonify({'error': 'driver not found'})
    
    # get driver information
    if request.method == 'GET':
        driver_dict = driver.to_dict()
        return jsonify(driver=driver_dict)
    
    # update driver information
    if request.method == 'PATCH':
        json_data = request.get_json()
        if json_data.get('phone'):
            phone = json_data['phone']
            driver.phone = phone
        if json_data.get('image_url'):
            image_url = json_data['image_url']
            driver.image_url = image_url
        driver.updated_at = datetime.datetime.now()
        db.session.commit()
        return jsonify({"Success": "Successfully updated the driver."})
    
    # delete driver
    db.session.delete(driver)
    db.session.commit()
    return jsonify({'Success': 'Driver successfully deleted.'})