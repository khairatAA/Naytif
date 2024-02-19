#!/usr/bin/python3
""" Test module for the address model"""
import unittest
from models.address import Address
from models.address import User
from sqlite3 import IntegrityError

class TestAddress(unittest.TestCase):

    # Address object can be created successfully with all required fields
    def test_create_address_with_required_fields(self):
        address = Address(id="1", user_id="1", address="123 Main St")
        self.assertEqual(address.id, "1")
        self.assertEqual(address.user_id, "1")
        self.assertEqual(address.address, "123 Main St")

    # to_dict() method returns a dictionary with all fields and their values
    def test_to_dict_method(self):
        address = Address(id="1", user_id="1", address="123 Main St")
        expected_dict = {
            "id": "1",
            "user_id": "1",
            "address": "123 Main St"
        }
        self.assertEqual(address.to_dict(), expected_dict)

    # Relationship between Address and User objects can be established successfully
    def test_relationship_with_user(self):
        address = Address(id="1", user_id="1", address="123 Main St")
        user = User(id="1", name="John Doe")
        address.user = user
        self.assertEqual(address.user, user)

    # Address object cannot be created without a user_id
    def test_create_address_without_user_id(self):
        with self.assertRaises(TypeError):
            address = Address(id="1", address="123 Main St")

    # Address object cannot be created without an address
    def test_create_address_without_address(self):
        with self.assertRaises(TypeError):
            address = Address(id="1", user_id="1")

    # Address object cannot be created with an id that already exists in the database
    def test_create_address_with_existing_id(self):
        with self.assertRaises(IntegrityError):
            address1 = Address(id="1", user_id="1", address="123 Main St")
            address2 = Address(id="1", user_id="2", address="456 Elm St")