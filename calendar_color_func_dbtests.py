import unittest
from server import app
from calendar_color_func import *
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

    def test_get_color_options(self):
        #TODO how do I test this in a better way
        self.assertEqual(len(get_color_options(2)), 3)
        self.assertEqual(len(get_color_options(1)), 2)

    def test_format_color_response(self):
        self.assertEqual(format_color_response(2), [{'colorId': 1 , 'user': 0, 'emotion': "neutral" , 'colorHex':"#ffffff", 'colorName': "white"}, {'colorId': 2, 'user': 0, 'emotion': "sad", 'colorHex': "#fd0000", 'colorName':"blue" }, {'colorId': 3, 'user': 2, 'emotion': "happy", 'colorHex': "#b04e00", 'colorName': "yellow"}])
        self.assertEqual(format_color_response(1), [{'colorId': 1 , 'user': 0, 'emotion': "neutral" , 'colorHex':"#ffffff", 'colorName': "white"}, {'colorId': 2, 'user': 0, 'emotion': "sad", 'colorHex': "#fd0000", 'colorName':"blue" }])
        
        
if __name__ == '__main__':
    unittest.main()