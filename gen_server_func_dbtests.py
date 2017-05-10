import unittest
from server import app
from gen_server_func import *

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

    def test_clear_old_session(self):
        #TODO how to test session
        pass

    def test_email_ind_db(self):
        self.assertTrue(email_in_db("b@gmail.com"))

        self.assertFalse(email_in_db("a@gmail.com"))

    def test_parse_day(self):
        self.assertEqual(parse_day("1-5-2017"), 1)

    def test_parse_month(self):
        self.assertEqual(parse_month("1-5-2017"), 5)

    def test_parse_year(self):
        self.assertEqual(parse_year("1-5-2017"), 2017)

if __name__ == '__main__':
    unittest.main()