#!/usr/bin/python3
""" Test module for the Driver model"""
from sqlite3 import IntegrityError
from models.driver import Driver
from models.order import Order
from models import db
import datetime
import unittest

class TestDriver(unittest.TestCase):

    # Driver object can be created with all required fields
    def test_create_driver_with_required_fields(self):
        driver = Driver(
            id="1",
            first_name="John",
            last_name="Doe",
            email="johndoe@example.com",
            password="password",
            phone="1234567890",
            vehicle_type="car"
        )
        self.assertEqual(driver.id, "1")
        self.assertEqual(driver.first_name, "John")
        self.assertEqual(driver.last_name, "Doe")
        self.assertEqual(driver.email, "johndoe@example.com")
        self.assertEqual(driver.password, "password")
        self.assertEqual(driver.phone, "1234567890")
        self.assertEqual(driver.vehicle_type, "car")

    # Driver object can be serialized to dictionary using to_dict method
    def test_serialize_driver_to_dict(self):
        driver = Driver(
            id="1",
            first_name="John",
            last_name="Doe",
            email="johndoe@example.com",
            password="password",
            phone="1234567890",
            vehicle_type="car"
        )
        driver_dict = driver.to_dict()
        expected_dict = {
            'id': '1',
            'first_name': 'John',
            'last_name': 'Doe',
            'email': 'johndoe@example.com',
            'password': 'password',
            'phone': '1234567890',
            'vehicle_type': 'car',
            'image_url': None,
            'created_at': datetime.datetime(2022, 1, 1, 0, 0),
            'updated_at': datetime.datetime(2022, 1, 1, 0, 0),
            'orders': []
        }
        self.assertEqual(driver_dict, expected_dict)

    # Driver object can have orders associated with it
    def test_driver_has_orders_associated(self):
        driver = Driver(
            id="1",
            first_name="John",
            last_name="Doe",
            email="johndoe@example.com",
            password="password",
            phone="1234567890",
            vehicle_type="car"
        )
        order = Order(
            id="1",
            driver_id="1",
            customer_id="1",
            created_at=datetime.datetime(2022, 1, 1, 0, 0),
            updated_at=datetime.datetime(2022, 1, 1, 0, 0)
        )
        driver.orders.append(order)
        self.assertEqual(driver.orders, [order])

    # Driver object cannot be created without any required field
    def test_create_driver_without_required_fields(self):
        with self.assertRaises(TypeError):
            driver = Driver()

    # Driver object cannot have duplicate email address
    def test_create_driver_with_duplicate_email(self):
        driver1 = Driver(
            id="1",
            first_name="John",
            last_name="Doe",
            email="johndoe@example.com",
            password="password",
            phone="1234567890",
            vehicle_type="car"
        )
        db.session.add(driver1)
        db.session.commit()
    
        with self.assertRaises(IntegrityError):
            driver2 = Driver(
                id="2",
                first_name="Jane",
                last_name="Smith",
                email="johndoe@example.com",
                password="password",
                phone="0987654321",
                vehicle_type="bike"
            )
            db.session.add(driver2)
            db.session.commit()

    # Driver object cannot have id set to None
    def test_create_driver_with_none_id(self):
        with self.assertRaises(TypeError):
            driver = Driver(
                id=None,
                first_name="John",
                last_name="Doe",
                email="johndoe@example.com",
                password="password",
                phone="1234567890",
                vehicle_type="car"
            )