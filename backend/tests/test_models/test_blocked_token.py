#!/usr/bin/python3
""" Test module for the token blockedlist model"""
from models.blocked_token import TokenBlocklist
from models import db
import unittest

class TestTokenBlocklist(unittest.TestCase):

    # TokenBlocklist can be instantiated without any errors
    def test_instantiation_without_errors(self):
        token_blocklist = TokenBlocklist()
        self.assertIsInstance(token_blocklist, TokenBlocklist)

    # TokenBlocklist can be saved to the database without any errors
    def test_save_to_database_without_errors(self):
        token_blocklist = TokenBlocklist()
        db.session.add(token_blocklist)
        db.session.commit()
        self.assertIsNotNone(token_blocklist.id)

    # TokenBlocklist can be retrieved from the database by id without any errors
    def test_retrieve_from_database_by_id_without_errors(self):
        token_blocklist = TokenBlocklist()
        db.session.add(token_blocklist)
        db.session.commit()
        retrieved_token_blocklist = TokenBlocklist.query.get(token_blocklist.id)
        self.assertEqual(token_blocklist, retrieved_token_blocklist)

    # TokenBlocklist with empty id cannot be saved to the database
    def test_empty_id_cannot_be_saved_to_database(self):
        token_blocklist = TokenBlocklist(id="")
        db.session.add(token_blocklist)
        with self.assertRaises(Exception):
            db.session.commit()

    # TokenBlocklist with empty jti cannot be saved to the database
    def test_empty_jti_cannot_be_saved_to_database(self):
        token_blocklist = TokenBlocklist(jti="")
        db.session.add(token_blocklist)
        with self.assertRaises(Exception):
            db.session.commit()

    # TokenBlocklist with id longer than 128 characters cannot be saved to the database
    def test_long_id_cannot_be_saved_to_database(self):
        long_id = "a" * 129
        token_blocklist = TokenBlocklist(id=long_id)
        db.session.add(token_blocklist)
        with self.assertRaises(Exception):
            db.session.commit()