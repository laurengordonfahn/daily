import unittest
from server import app
from calendar_options_func import *

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

    def test_query_month_year(self):
        self.assertEqual(query_month_year(1), [(4,1986)])

    def test_format_dateRange(self):
        self.assertEqual(format_dateRange([(4,1986)]), ["4/1986"])
        




if __name__ == '__main__':
    unittest.main()