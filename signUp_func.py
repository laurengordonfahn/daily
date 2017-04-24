# Functions to support /signUp
from flask import (Flask, request, render_template, flash, session, jsonify, abort)
from model import *
from flask_bcrypt import Bcrypt
import re

def clear_old_session():
    """ Deletes Session 
        Returns None
    """
    if 'current_user' in session:
        del session['current_user']

def email_in_db(email):
    """ Query DB see if email already in DB
        Return Boolean
    """

    checkEmail = User.query.filter(User.email == email).first() 
    print checkEmail, "Checkemail"

    if checkEmail:
        return True
    return False

def email_valid(email):
    """ Regex check if email valid 
        Return Boolean
    """

    return re.search("^[a-zA-Z][\w_\-\.]*@\w+\.\w{2,3}$", email)

def check_password(password):
    """ regex check if password valid length 
        Return status: "ok" or appropriate error message
    """

    elem_check = re.search("^[0-9a-zA-Z]{6,}$", password)
    num_check = re.search("[\d]", password)
    len_check = (len(password) >= 6)

    if not elem_check:
        msg_dict = {False: "Password must contain at least one number and can only contain numbers and letters"}
    elif not num_check:
        msg_dict = {False: "Password must contain at least one number"}
    elif not len_check:
        msg_dict = {False: "Password must be at least 6 characters long"}
    else:
        msg_dict = {True : "ok"}
    return msg_dict

def check_matching(value1, value2):
    """ Check if two values match for email and password confirmation before accepting
        Return Boolean
    """

    if value1 == value2:
        return True
    return False

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




