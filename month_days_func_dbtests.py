import unittest
from server import app
from month_days_func import *
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

    def test_format_dayArray(self):
        self.assertEqual(format_dayArray(4, 1986, 1), ["31-4-1986"])
        self.assertEqual(format_dayArray(5, 1986, 1), [])
        

if __name__ == '__main__':
    unittest.main()