import unittest
from server import app, bcrypt
from signUp_func import *
from flask.ext.bcrypt import Bcrypt



class TestSignupFunc(unittest.TestCase):
    
    def test_check_matching(self):
        self.assertTrue(check_matching("foo","foo"))
        self.assertFalse(check_matching("foo","bar"))

    def test_email_valid(self):
        self.assertTrue(email_valid("a@b.com"))
        self.assertTrue(email_valid("12345@gmail.com"))
        self.assertTrue(email_valid("12345@scammy.business"))


        self.assertFalse(email_valid("@b.com"))
        self.assertFalse(email_valid(".com"))
        self.assertFalse(email_valid(""))

    def test_check_password(self):
        good = [
            "aaaaaa1",
            "aaaaaa1-",
            "-aaaaaa1",
        ]
        for x in good:
            self.assertTrue(check_password(x),x)

        bad = [
            "",
            "aaaa1",
            "aaaaaa",
            "123456",
        ]
        for x in bad:
            self.assertIsFalse(check_password(x),x)


    def test_hash_password(self):

        self.assertTrue(bcrypt.check_password_hash(hash_password("b12345", app), "b12345"))
    



if __name__ == '__main__':
    unittest.main()
