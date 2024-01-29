#!/usr/bin/python3
"""Test module for base_model class"""
from models.base_model import BaseModel
import unittest
import datetime


class TestBaseModel(unittest.TestCase):
    """Test class for the BaseModel class"""
    def setUp(self):
        """Set up base_model obj"""
        self.base_model = BaseModel()
    
    def test_id_attr(self):
        """Tests the id attribute"""
        self.assertTrue(hasattr(self.base_model, "id"))
        self.assertTrue(isinstance(self.base_model.id, str))

        new_base_model = BaseModel()
        self.assertNotEqual(new_base_model.id, self.base_model)
    
    def test_created_at_attr(self):
        """Tests the created_at attribute of the base_model obj"""
        self.assertTrue(hasattr(self.base_model, "created_at"))
        self.assertTrue(isinstance(self.base_model.created_at, datetime.datetime))
        now = datetime.datetime.now()
        self.assertTrue(self.base_model.created_at < now)
    
    def test_updated_at_attr(self):
        """Tests the updated_at attribute of the base_model obj"""
        self.assertTrue(hasattr(self.base_model, "updated_at"))
        self.assertTrue(isinstance(self.base_model.updated_at, datetime.datetime))
        now = datetime.datetime.now()
        self.assertTrue(self.base_model.updated_at < now)
    
    def test_to_dict_method(self):
        """Tests the to_dict method"""
        self.assertTrue(hasattr(self.base_model, "to_dict"))

        self.base_model.name = "Omar"
        obj_dict = self.base_model.to_dict()
        self.assertTrue(isinstance(obj_dict, dict))
        self.assertTrue(obj_dict['name'] == "Omar")
        self.assertTrue(obj_dict['class_name'] == "BaseModel")
        self.assertFalse('_sa_instance_state' in obj_dict)

    def test_to_string_method(self):
        """Test the string method"""
        obj_string = str(self.base_model)
        id = self.base_model.id
        obj_dict = self.base_model.to_dict()
        new_string = "[BaseModel] ({}) {}".format(id, obj_dict)
        self.assertEqual(obj_string, new_string)