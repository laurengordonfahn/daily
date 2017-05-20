import unittest
from server import app
from signUp_func import *
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

    def test_check_signUp_info(self):
        self.assertEqual(check_signUp_info("a@gmail.com", "a@gmail.com", "b12345", "b12345"), {})
        self.assertEqual(check_signUp_info("b@gmail.com", "@gmail.com", "12345", "b12345"), {"email match": "Your emails do not match", "password match" : "Your passwords do not match", "password invalid": "Passwords must be at least 6 characters long and contain at least one number and at least one letter","email unavailable": "Please try a differnt email"})

        self.assertEqual(check_signUp_info("@gmail.com", "b@gmail.com", "12345", "b12345"), {"email match": "Your emails do not match", "password match" : "Your passwords do not match", "email invalid": "Your email is not valid", "password invalid": "Passwords must be at least 6 characters long and contain at least one number and at least one letter"})

    def test_add_user_db(self):
        self.assertIs(add_user_db("b@gmail.com", "b12345", app), 1)

        self.assertIsNot(add_user_db("b@gmail.com", "b12345", app), 2)

    def test_add_user_db(self):
        self.assertIs(add_user_db("e@gmail.com", "e12345", app), 4)
        self.assertIsNot(add_user_db("e@gmail.com", "e12345", app), 1)

    def test_signUp_db_session(self):
        #TODO How do I test session

        # with self.app as c:
        #     with c.session_transaction() as sess:
        #         sess['user_id'] = 1
        # signUp_db_session("b@gmail.com", "b12345", app)

        # self.assertTrue(session['current_user'], 1 )
        # self.assertFalse
        pass

    def prep_signUp(self, email1, email2, password1, password2):
        return self.app.post('/signUp', data=dict(
                email1=email1,
                email2=email2,
                password1=password1,
                password2=password2))
    def test_signUp(self):
        rv = self.prep_signUp("a@gmail.com", "a@gmail.com", "ab12345", "a12345")
        


if __name__ == '__main__':
    unittest.main()