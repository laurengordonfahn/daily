import server
import unittest
from server import app, bcrypt
from model import db, example_data, connect_to_db
from flask_jwt import JWT, jwt_required, current_identity


class ServerTestCase(unittest.TestCase):

    def setUp(self):
        """ Setup before tests"""
        self.client = server.app.test_client()
        self.app = app.test_client()
        app.config['TESTING'] = True 
        app.config['SECRET_KEY'] ='pouring monday'
        

        #connect to test database
        connect_to_db(app, "postgresql:///testdaily")

        #create tables and add sample data
        db.create_all()
        example_data()

        # def authenticate(username, password):
        #     user=User.query.filter_by(email=username).first()
        #     if confirm_password(username, password, app):
        #         return user

        # def identity(payload):
        #     user_id = payload['identity']
        #     return User.query.filter_by(id=user_id).first()

        # jwt=JWT(app, authenticate, identity)

        # @app.route('/protected')
        # @jwt_required()
        # def protected():
        #     return '%s' % current_identity
        # user_id = current_identity.id


    def tearDown(self):
        """ Teardown after tests"""

        db.session.close()
        db.drop_all()

    # def test_index(self):
    #     client = server.app.test_client()

    #     result = client.get('/')
    #     self.assertIn('<div id=\'main\'></div>', result.data)
    # def test_signUp(self):
    #     client = server.app.test_client()

    #     result = self.client.post("/signUp",
    #                                 data={
    #                                        "email1": "a@gmail.com",
    #                                        "email2": "a@gmail.com",
    #                                        "password1": "a12345",
    #                                        "password2": "a12345"
    #                                  })
       
    #     str_contains = ( '"isLoggedIn": true' in result.data )
        
    #     self.assertEqual(True, str_contains)

    # def test_signIn(self):
    #     client = server.app.test_client()

    #     result = self.client.post("/signIn",
    #                                 data={
    #                                        "email": "b@gmail.com",
    #                                        "password": "b12345"
    #                                  })
    #     str_contains = ('"isLoggedIn": true' in result.data)
        
    #     self.assertEqual(True, str_contains)

    # def test_calendar_options(self):
    #     client = server.app.test_client()

    #     result = self.client.get("/calendar/options", 
    #                             headers={"Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6MSwiaWF0IjoxNDk2Mjc5MjExLCJuYmYiOjE0OTYyNzkyMTEsImV4cCI6MTQ5ODg3MTIxMX0.TlLor__CZXkCYnZZoKPr5Nhg4RkOW9nuQZlpgmEprOo"
    #                             }
    #     )
       
    #     str_contains = ( '"dateRange"' in result.data )
        
    #     self.assertEqual(True, str_contains)

    def test_month_days(self):
        client = server.app.test_client()

        result = self.client.get("/month/days", 
                                headers={"Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6MSwiaWF0IjoxNDk2Mjc5MjExLCJuYmYiOjE0OTYyNzkyMTEsImV4cCI6MTQ5ODg3MTIxMX0.TlLor__CZXkCYnZZoKPr5Nhg4RkOW9nuQZlpgmEprOo"
                                },
                                data={"month": 11, "year": 2016}
        )
       
        str_contains = ( '"dateArray"' in result.data )
        print ("result.data", result.data)
        self.assertEqual(True, str_contains)

    # def test_calendar_color(self):
    #     client = server.app.test_client()

    #     result = self.client.get("/calendar/color", 
    #                             headers={"Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6MSwiaWF0IjoxNDk2Mjc5MjExLCJuYmYiOjE0OTYyNzkyMTEsImV4cCI6MTQ5ODg3MTIxMX0.TlLor__CZXkCYnZZoKPr5Nhg4RkOW9nuQZlpgmEprOo"
    #                             }
    #     )
       
    #     str_contains = ( '"colorResponse"' in result.data )
        
    #     self.assertEqual(True, str_contains)


    def test_calendar_chart(self):
        client = server.app.test_client()

        result = self.client.get("/month/chart", 
                                headers={"Authorization" : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6MSwiaWF0IjoxNDk2Mjc5MjExLCJuYmYiOjE0OTYyNzkyMTEsImV4cCI6MTQ5ODg3MTIxMX0.TlLor__CZXkCYnZZoKPr5Nhg4RkOW9nuQZlpgmEprOo"
                                },
                                data={"colorOrder":["neutral"]}
                                
        )
       
        str_contains = ( '"after"' in result.data )
        print ("result.data", result.data)
        
        self.assertEqual(True, str_contains)


if __name__ == '__main__':
    unittest.main()