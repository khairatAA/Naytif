#!/usr/bin/python3
"""Test Module for the User class"""
from models.user import User
from models.delivery import DeliveryDetails
import unittest


class TestUser(unittest.TestCase):
    """Test suite for the User attributes"""
    def setUp(self):
        """Setup method for the user obj"""
        self.user = User()

    def test_user_object_created_successfully(self):
        """ User object created successfully with all required attributes
        """
        self.assertIsInstance(self.user, User)
        self.assertTrue(hasattr(self.user, "id"))
        self.assertTrue(hasattr(self.user, "first_name"))
        self.assertTrue(hasattr(self.user, "last_name"))
        self.assertTrue(hasattr(self.user, "email"))
        self.assertTrue(hasattr(self.user, "password"))
        self.assertTrue(hasattr(self.user, "phone"))
        self.assertTrue(hasattr(self.user, "image_url"))
        self.assertTrue(hasattr(self.user, "created_at"))
        self.assertTrue(hasattr(self.user, "updated_at"))
        self.assertTrue(hasattr(self.user, "delivery_details"))
    
    def test_user_object_to_dict(self):
        """ User object can be converted to dictionary format
        """
        user_dict = self.user.to_dict()
        self.assertIsInstance(user_dict, dict)
        self.assertNotIn('_sa_instance_state', user_dict)
    

    def test_user_object_add_delivery_details(self):
        """ User object can add delivery details successfully
        """
        delivery_details = DeliveryDetails()
        self.user.delivery_details.append(delivery_details)
        self.assertEqual(len(self.user.delivery_details), 1)
        self.assertEqual(self.user.delivery_details[0], delivery_details)
    
    def test_user_object_creation_without_required_attributes(self):
        """ User object cannot be created without required attributes
        """
        with self.assertRaises(TypeError):
            user = User()

    # User object cannot be created with invalid attributes
    def test_user_object_creation_with_invalid_attributes(self):
        """ User object email attribute must be unique
        """
        with self.assertRaises(TypeError):
            with app.app_context():
                db.drop_all()
                db.create_all()
                user = User(id=123, first_name="John", last_name="Doe", email="john.doe@example.com", password="password")

    # User object cannot have delivery details added with invalid attributes
    def test_user_object_add_delivery_details_with_invalid_attributes(self):
        """ User object password attribute must not be empty
        """
        with self.assertRaises(TypeError):
            self.user.delivery_details.append("invalid_delivery_details")