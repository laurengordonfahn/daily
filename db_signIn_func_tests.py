import unittest
from server import app
from signIn_func import *
from model import db, example_data, connect_to_db

class DBSignUpTests(unittest.TestCase):

    def setUp(self):
        """ Setup before tests"""

        self.app = app.test_client()
        app.config['TESTING'] = True 
        app.config['SECRET_KEY'] ='pouring monday'
        

        #connect to test database
        connect_to_db(app, "postgresql:///testdaily")

        #create tables and add sample data
        db.create_all()
        example_data()


    def tearDown(self):
        """ Teardown after tests"""

        db.session.close()
        db.drop_all()

    def test_confirm_password(self):
        self.assertTrue(confirm_password("b@gmail.com", "b12345", app))
        self.assertFalse(confirm_password("b@gmail.com", "12345", app))

    def test_confirm_signIn_Info(self):
        self.assertEqual(confirm_signIn_info("b@gmail.com","b12345", app), {})
        self.assertEqual(confirm_signIn_info("a@gmail.com", "a12345", app), {"email": "Your email does not match our records"})
        self.assertEqual(confirm_signIn_info("b@gmail.com", "a12345", app), {"password": "Your password does not match our records"})

        self.assertNotEqual(confirm_signIn_info("b@gmail.com","b12345", app), {"email": "Your email does not match our records"})

    def test_add_to_session(self):
        #TODO how to test session added

        pass


if __name__ == '__main__':
    unittest.main()