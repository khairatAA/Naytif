import unittest
from models.menu import Menu
from models.restaurant import Restaurant

class TestMenu(unittest.TestCase):

    # Creating a new Menu object should set all attributes correctly
    def test_create_new_menu_object(self):
        menu = Menu(
            id="1",
            restaurant_id="123",
            name="Cheeseburger",
            price=9.99,
            category="Burgers",
            description="A delicious cheeseburger with all the fixings",
            image_url="http://example.com/burger.jpg"
        )

        self.assertEqual(menu.id, "1")
        self.assertEqual(menu.restaurant_id, "123")
        self.assertEqual(menu.name, "Cheeseburger")
        self.assertEqual(menu.price, 9.99)
        self.assertEqual(menu.category, "Burgers")
        self.assertEqual(menu.description, "A delicious cheeseburger with all the fixings")
        self.assertEqual(menu.image_url, "http://example.com/burger.jpg")

    # Calling to_dict() method on a Menu object should return a dictionary with all attributes
    def test_to_dict_method(self):
        menu = Menu(
            id="1",
            restaurant_id="123",
            name="Cheeseburger",
            price=9.99,
            category="Burgers",
            description="A delicious cheeseburger with all the fixings",
            image_url="http://example.com/burger.jpg"
        )

        menu_dict = menu.to_dict()

        expected_dict = {
            "id": "1",
            "restaurant_id": "123",
            "name": "Cheeseburger",
            "price": 9.99,
            "category": "Burgers",
            "description": "A delicious cheeseburger with all the fixings",
            "image_url": "http://example.com/burger.jpg"
        }

        self.assertEqual(menu_dict, expected_dict)

    # Adding a new Menu object to a Restaurant object should update the menu_items relationship correctly
    def test_add_menu_item(self):
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

    # Creating a new Menu object with a null attribute should raise an error
    def test_create_new_menu_with_null_attribute(self):
        with self.assertRaises(TypeError):
            menu = Menu(
                id="1",
                restaurant_id="123",
                name=None,
                price=9.99,
                category="Burgers",
                description="A delicious cheeseburger with all the fixings",
                image_url="http://example.com/burger.jpg"
            )

    # Creating a new Menu object with an attribute exceeding the maximum length should raise an error
    def test_create_new_menu_with_exceeding_length_attribute(self):
        with self.assertRaises(ValueError):
            menu = Menu(
                id="1",
                restaurant_id="123",
                name="Cheeseburger",
                price=9.99,
                category="Burgers",
                description="A delicious cheeseburger with all the fixings",
                image_url="http://example.com/burger.jpg" * 100
            )

    # Creating a new Menu object with a non-unique name should raise an error
    def test_create_new_menu_with_non_unique_name(self):
        menu1 = Menu(
            id="1",
            restaurant_id="123",
            name="Cheeseburger",
            price=9.99,
            category="Burgers",
            description="A delicious cheeseburger with all the fixings",
            image_url="http://example.com/burger.jpg"
        )

        with self.assertRaises(ValueError):
            menu2 = Menu(
                id="2",
                restaurant_id="456",
                name="Cheeseburger",
                price=8.99,
                category="Burgers",
                description="A tasty cheeseburger with all the fixings",
                image_url="http://example.com/burger.jpg"
            )