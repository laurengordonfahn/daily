# Functions to support /signUp
from flask import (Flask, request, render_template, flash, session, jsonify, abort)
from model import *
from flask_bcrypt import Bcrypt
import re

from gen_server_func import email_in_db
# from server import (NoticesException, handle_notices_exception, handle_base_exception)

def check_matching(value1, value2):
    """ Check if two values match for email and password confirmation before accepting
        Return Boolean
    """
    return value1 == value2


def email_valid(email):
    """ Regex check if email valid 
        Return Boolean
    """
    return re.search("^([a-zA-Z0-9\w_\-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,10})$", email)


def check_password(password):
    """ regex check if password valid - 6 char min, one num, one letter  
        Return Boolean string error message
    """

    elem_check = re.search("[a-zA-Z]", password)
    num_check = re.search("[\d]+", password)
    len_check = (len(password) >= 6)

    if elem_check and num_check and len_check:
        return True


def check_signUp_info(email1, email2, password1, password2):
    """ Check if Email vaild 
        Check if password vaild
        Check if Email in DB
        Raise Excpetion with dict with notices if needed
        Return None
    """
    notices = {}

    if not check_matching(email1, email2):
        notices["email match"] = "Your emails do not match"
    if not check_matching(password1, password2):
        notices["password match"] = "Your passwords do not match"
    if not email_valid(email1):
        notices["email invalid"] = "Your email is not valid" 
    if email_in_db(email1):
        notices["email unavailable"] = "Please try a differnt email"
    if not check_password(password1):
        notices["password invalid"] = "Passwords must be at least 6 characters long and contain at least one number and at least one letter"

    # if len(notices) > 0:

        # raise NoticesException(notices)
    return notices


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

def signUp_db_session(email, password, app):
    """ Create session and add user_id
        Return None
    """
    
    user_id = add_user_db(email, password, app)

    session.setdefault('current_user', user_id)

    return 

