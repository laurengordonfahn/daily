# Functions to support /signIn
from flask import (Flask, request, render_template, flash, session, jsonify, abort)
from model import *
from gen_server_func import email_in_db
from flask_bcrypt import Bcrypt

# functions clear_old_session and email_in_db taken from signUp_func.def 

def confirm_password(email, password, app):
    """ Check if password matches hash
        Return Boolean
    """
    user = User.query.filter(User.email==email).first()
    
    return Bcrypt(app).check_password_hash(user.password, password)

def confirm_signIn_info(email, password, app):
    notices = {}

    if not email_in_db(email):
        notices["email"] = "Your email does not match our records"
    elif not confirm_password(email, password, app):
        notices["password"] = "Your password does not match our records"
    
    return notices

def add_to_session(email):
    """ Add user to session
        Return None
    """
    
    user = User.query.filter_by(email=email).first()
    session.setdefault('current_user', user.id)

    return 
    
