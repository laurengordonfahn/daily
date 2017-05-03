# Functions to support /signUp
from flask import (Flask, request, render_template, flash, session, jsonify, abort)
from model import *
from flask_bcrypt import Bcrypt
import re

def check_matching(value1, value2):
    """ Check if two values match for email and password confirmation before accepting
        Return Boolean
    """
    return value1 == value2


def email_valid(email):
    """ Regex check if email valid 
        Return Boolean
    """
    return re.search("^[a-zA-Z0-9][\w_\-\.]*@\w+\.\w{2,3}$", email)


def check_password(password):
    """ regex check if password valid - 6 char min, one num, one letter  
        Return None string error message
    """

    elem_check = re.search("^[0-9a-zA-Z]{6,}$", password)
    num_check = re.search("[\d]", password)
    len_check = (len(password) >= 6)

    print("elem_check, num_check, len_check", elem_check, num_check, len_check)
    if not elem_check or not num_check or not len_check:
        return "Passwords must be at least 6 characters long and contain at least one number and at least one letter"
    

def hash_password(password, app):
    """ Take valid passwords and hash them
        Return None
    """
    return Bcrypt(app).generate_password_hash(password)

def add_user_db(email, password, app):
    """ Add valid email/password combo to DB
        Return user_id
    """
    hash_pass = hash_password(password, app)

    user = User(email = email, password=hash_pass)
    db.session.add(user)
    db.session.commit()

    return User.query.filter_by(email = email).first().id

def signup_db_session(email, password, app):
    """ Create session and add user_id
        Return None
    """
    
    user_id = add_user_db(email, password, app)

    session.setdefault('current_user', user_id)

    return 




