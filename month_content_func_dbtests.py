import unittest
from server import app
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

    
    def test_is_month(self):
        self.assertTrue(is_month(4, 1986, 1))
        self.assertFalse(is_month(5, 1986, 1))


    def test_create_days_month(self):
        self.assertEqual(create_days_month(5, 2017), ['01-05-2017', '02-05-2017', '03-05-2017', '04-05-2017', '05-05-2017', '06-05-2017', '07-05-2017', '08-05-2017', '09-05-2017', '10-05-2017', '11-05-2017', '12-05-2017', '13-05-2017', '14-05-2017', '15-05-2017', '16-05-2017', '17-05-2017', '18-05-2017', '19-05-2017', '20-05-2017', '21-05-2017', '22-05-2017', '23-05-2017', '24-05-2017', '25-05-2017', '26-05-2017', '27-05-2017', '28-05-2017', '29-05-2017', '30-05-2017', '31-05-2017'])
        

    def test_parse_weekday(self):
        self.assertEqual(parse_weekday("1-5-2017"), '1')
        self.assertNotEqual(parse_weekday("1-5-2017"), '6')

    def test_establish_month(self):
        # assert
        # TODO how to test adding somehting to the database HOW do i test functions that don't return anything but create a result?
        self.assertEqual(gather_all_month_content(5, 1986, 1), [])
        establish_month(5, 1986, 1)
        self.assertIsNotNone(gather_all_month_content(5, 1986, 1))
        
    def test_gather_all_month_content(self):
        #TODO model object invalid syntax because memory storage location work on this. 
        self.assertEqual(len(gather_all_month_content(5, 2017, 1)), 31)
    #     # Is there anything else I should be testing for? 

    # TODO how do I write tests for these kind of functions? Or how should I have writen them to be testable?  
    # def test_format_date_string(self):

    #     self.assertEqual(format_date_string(<model.Day object at 0x104b894d0>, "1-5-2017")
    #     self.assertNotEqual(format_date_string(<model.Day object at 0x104b894d0>), "5-1-2017")

    # def test_format_date_content_dict(self):
    #     self.assertEqual(format_date_content_dict(<model.Day object at 0x104b894d0>), {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 1, 'day': 1})

    #     self.assertNotEqual(format_date_content_dict(<model.Day object at 0x104b894d0>), ['adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 1, 'day': 1])

    def test_format_day_content(self):
        #the erorr that user 1 4-86 is being generated makes not sense what is happening. 
        self.assertEqual(format_day_content(5, 2017, 2), { '1-5-2017': {'adj1': u'joyous', 'colorId': 2, 'adj3': u'crappy', 'adj2': u'funky', 'weekday': 1, 'day': 1}})
        #checking on working with example data not generating a month fresh
        self.assertNotEqual(format_day_content(5, 2017, 1), {'24-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 3, 'day': 24}, '21-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 0, 'day': 21}, '3-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 3, 'day': 3}, '26-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 5, 'day': 26}, '7-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 0, 'day': 7}, '22-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 1, 'day': 22}, '20-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 6, 'day': 20}, '16-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 2, 'day': 16}, '12-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 5, 'day': 12}, '8-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 1, 'day': 8}, '4-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 4, 'day': 4}, '30-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 2, 'day': 30}, '29-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 1, 'day': 29}, '5-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 5, 'day': 5}, '6-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 6, 'day': 6}, '1-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 1, 'day': 1}, '10-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 3, 'day': 10}, '9-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 2, 'day': 9}, '11-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 4, 'day': 11}, '14-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 0, 'day': 14}, '28-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 0, 'day': 28}, '19-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 5, 'day': 19}, '13-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 6, 'day': 13}, '2-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 2, 'day': 2}, '31-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 3, 'day': 31}, '17-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 3, 'day': 17}, '15-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 1, 'day': 15}, '23-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 2, 'day': 23}, '18-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 4, 'day': 18}, '27-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 6, 'day': 27}, '25-5-2017': {'adj1': u'', 'colorId': 1, 'adj3': u'', 'adj2': u'', 'weekday': 4, 'day': 25}})
if __name__ == '__main__':
    unittest.main()