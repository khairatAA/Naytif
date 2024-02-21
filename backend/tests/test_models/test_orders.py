#!/usr/bin/python3
"""Test module for the orders model"""
from models.order import Order
import unittest
from models import db


class TestOrder(unittest.TestCase):

    # Creating a new order with valid data should add it to the database
    def test_create_order_with_valid_data(self):
        # Create a new order with valid data
        order = Order(
            id="123",
            menu_item_id="456",
            restaurant_id="789",
            user_id="abc", driver_id="def",
            number_of_order=2,
            subtotal=10.99,
            order_status="Preparing"
        )
    
        # Add the order to the database
        db.session.add(order)
        db.session.commit()
    
        # Retrieve the order from the database
        retrieved_order = Order.query.get("123")
    
        # Check if the retrieved order is the same as the created order
        self.assertEqual(order, retrieved_order)

    # Retrieving an existing order by ID should return the correct order object
    def test_retrieve_order_by_id(self):
        # Create a new order and add it to the database
        order = Order(
            id="123",
            menu_item_id="456",
            restaurant_id="789",
            user_id="abc", driver_id="def",
            number_of_order=2,
            subtotal=10.99,
            order_status="Preparing"
        )
        db.session.add(order)
        db.session.commit()
    
        # Retrieve the order by ID
        retrieved_order = Order.query.get("123")
    
        # Check if the retrieved order is the same as the created order
        self.assertEqual(order, retrieved_order)

    # Updating an existing order's status should update the order object in the database
    def test_update_order_status(self):
        # Create a new order and add it to the database
        order = Order(
            id="123",
            menu_item_id="456",
            restaurant_id="789",
            user_id="abc", driver_id="def",
            number_of_order=2,
            subtotal=10.99,
            order_status="Preparing"
        )
        db.session.add(order)
        db.session.commit()
    
        # Update the order's status
        order.order_status = "Delivered"
        db.session.commit()
    
        # Retrieve the updated order from the database
        updated_order = Order.query.get("123")
    
        # Check if the updated order's status is correct
        self.assertEqual(updated_order.order_status, "Delivered")

    # Creating an order with missing required fields should raise an error
    def test_create_order_with_missing_fields(self):
        # Try to create an order with missing required fields
        with self.assertRaises(Exception):
            Order(
                id="123",
                menu_item_id="456",
                user_id="abc", 
                driver_id="def",
                number_of_order=2, 
                subtotal=10.99, 
                order_status="Preparing"
            )

    # Creating an order with invalid data types for fields should raise an error
    def test_create_order_with_invalid_data_types(self):
        # Try to create an order with invalid data types for fields
        with self.assertRaises(Exception):
            Order(
                id=123,
                menu_item_id="456",
                restaurant_id="789",
                user_id="abc",
                driver_id="def",
                number_of_order=2,
                subtotal=10.99,
                order_status="Preparing"
            )

    # Creating an order with a negative number of orders should raise an error
    def test_create_order_with_negative_number_of_orders(self):
        # Try to create an order with a negative number of orders
        with self.assertRaises(Exception):
            Order(
                id="123",
                menu_item_id="456",
                restaurant_id="789",
                user_id="abc",
                driver_id="def",
                number_of_order=-2,
                subtotal=10.99,
                order_status="Preparing"
            )