#!/usr/bin/python3
""" Test module for the delivery details model"""
import unittest
from models.delivery import DeliveryDetails
from models.user import User

class TestDeliveryDetails(unittest.TestCase):

    # DeliveryDetails object created successfully with all required attributes
    def test_delivery_details_object_created_successfully(self):
        delivery_details = DeliveryDetails()
        self.assertIsInstance(delivery_details, DeliveryDetails)
        self.assertTrue(hasattr(delivery_details, "id"))
        self.assertTrue(hasattr(delivery_details, "user_id"))
        self.assertTrue(hasattr(delivery_details, "phone"))
        self.assertTrue(hasattr(delivery_details, "address"))
        self.assertTrue(hasattr(delivery_details, "user"))

    # DeliveryDetails object can be converted to dictionary format
    def test_delivery_details_object_to_dict(self):
        delivery_details = DeliveryDetails()
        delivery_details_dict = delivery_details.to_dict()
        self.assertIsInstance(delivery_details_dict, dict)
        self.assertNotIn('_sa_instance_state', delivery_details_dict)

    # DeliveryDetails object can be associated with a User object
    def test_delivery_details_object_associate_with_user(self):
        user = User()
        delivery_details = DeliveryDetails()
        delivery_details.user = user
        self.assertEqual(delivery_details.user, user)

    # DeliveryDetails object cannot be created without user_id attribute
    def test_delivery_details_object_creation_without_user_id(self):
        with self.assertRaises(TypeError):
            delivery_details = DeliveryDetails(address="123 Main St")

    # DeliveryDetails object cannot be created without address attribute
    def test_delivery_details_object_creation_without_address(self):
        with self.assertRaises(TypeError):
            delivery_details = DeliveryDetails(user_id="123", phone="1234567890")

    # DeliveryDetails object cannot have id attribute set to None
    def test_delivery_details_object_creation_with_none_id(self):
        with self.assertRaises(TypeError):
            delivery_details = DeliveryDetails(id=None, user_id="123", address="123 Main St")