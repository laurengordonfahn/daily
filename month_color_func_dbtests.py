import unittest
from server import app
from month_color_func import *
from month_content_func import *
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

    def test_updateColor(self):
        self.assertEqual(format_day_content(5, 2017, 2), { '1-5-2017': {'adj1': u'joyous', 'colorId': 2, 'adj3': u'crappy', 'adj2': u'funky', 'weekday': 1, 'day': 1}})
        updateColor(2, "1-5-2017", 3)
        self.assertEqual(format_day_content(5, 2017, 2), { '1-5-2017': {'adj1': u'joyous', 'colorId': 3, 'adj3': u'crappy', 'adj2': u'funky', 'weekday': 1, 'day': 1}})
        

if __name__ == '__main__':
    unittest.main()