#!/usr/bin/python3
"""Test module for the Restaurant class"""
from models.restaurant import Restaurant
from models.menu import Menu
import unittest

class TestRestaurant(unittest.TestCase):
    """ Test suite for the Restaurant model
    """

    def test_create_new_restaurant_object(self):
        """ Creating a new Restaurant object should set all attributes correctly
        """
        restaurant = Restaurant(
            id="123",
            address="123 Main St",
            store_name="Restaurant A",
            brand_name="Brand A",
            first_name="John",
            last_name="Doe",
            email="john.doe@example.com",
            password="password",
            phone="123-456-7890",
            image_url="http://example.com/image.jpg"
        )
    
        self.assertEqual(restaurant.id, "123")
        self.assertEqual(restaurant.address, "123 Main St")
        self.assertEqual(restaurant.store_name, "Restaurant A")
        self.assertEqual(restaurant.brand_name, "Brand A")
        self.assertEqual(restaurant.first_name, "John")
        self.assertEqual(restaurant.last_name, "Doe")
        self.assertEqual(restaurant.email, "john.doe@example.com")
        self.assertEqual(restaurant.password, "password")
        self.assertEqual(restaurant.phone, "123-456-7890")
        self.assertEqual(restaurant.image_url, "http://example.com/image.jpg")

    def test_to_dict_method(self):
        """  Calling to_dict() method on a Restaurant object should return a dictionary with all attributes
        """
        restaurant = Restaurant(
            id="123",
            address="123 Main St",
            store_name="Restaurant A",
            brand_name="Brand A",
            first_name="John", last_name="Doe",
            email="john.doe@example.com",
            password="password",
            phone="123-456-7890",
            image_url="http://example.com/image.jpg"
        )
    
        restaurant_dict = restaurant.to_dict()
    
        expected_dict = {
            "id": "123",
            "address": "123 Main St",
            "store_name": "Restaurant A",
            "brand_name": "Brand A",
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "password": "password",
            "phone": "123-456-7890",
            "image_url": "http://example.com/image.jpg"
        }
    
        self.assertEqual(restaurant_dict, expected_dict)

    def test_add_menu_item(self):
        """ Adding a new menu item to a Restaurant object should update the menu_items relationship correctly
        """
        restaurant = Restaurant(
            id="123",
            address="123 Main St",
            store_name="Restaurant A",
            brand_name="Brand A",
            first_name="John",
            last_name="Doe",
            email="john.doe@example.com",
            password="password",
            phone="123-456-7890",
            image_url="http://example.com/image.jpg"
        )
    
        menu_item = Menu(name="Burger", price=10.99)
        restaurant.menu_items.append(menu_item)
    
        self.assertEqual(len(restaurant.menu_items), 1)
        self.assertEqual(restaurant.menu_items[0].name, "Burger")
        self.assertEqual(restaurant.menu_items[0].price, 10.99)

    def test_create_new_restaurant_with_null_attribute(self):
        """ Creating a new Restaurant object with a null attribute should raise an error
        """
        with self.assertRaises(TypeError):
            restaurant = Restaurant(
                id="123",
                address=None,
                store_name="Restaurant A",
                brand_name="Brand A",
                first_name="John",
                last_name="Doe",
                email="john.doe@example.com",
                password="password",
                phone="123-456-7890",
                image_url="http://example.com/image.jpg"
            )

    def test_create_new_restaurant_with_exceeding_length_attribute(self):
        """ Creating a new Restaurant object with an attribute exceeding the maximum length should raise an error
        """
        with self.assertRaises(ValueError):
            restaurant = Restaurant(
            id="123",
            address="123 Main St",
            store_name="Restaurant A",
            brand_name="Brand A",
            first_name="John",
            last_name="Doe",
            email="john.doe@example.com",
            password="password",
            phone="123-456-7890",
            image_url="http://example.com/image.jpg" * 100
        )

    def test_create_new_restaurant_with_non_unique_email(self):
        """ Creating a new Restaurant object with a non-unique email should raise an error
        """
        restaurant1 = Restaurant(
            id="123",
            address="123 Main St",
            store_name="Restaurant A",
            brand_name="Brand A",
            first_name="John",
            last_name="Doe",
            email="john.doe@example.com",
            password="password",
            phone="123-456-7890",
            image_url="http://example.com/image.jpg")
    
        with self.assertRaises(ValueError):
            restaurant2 = Restaurant(
                id="456",
                address="456 Main St",
                store_name="Restaurant B",
                brand_name="Brand B",
                first_name="Jane",
                last_name="Smith",
                email="john.doe@example.com",
                password="password",
                phone="987-654-3210",
                image_url="http://example.com/image.jpg"
            )