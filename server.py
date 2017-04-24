from flask import (Flask, request, render_template, redirect, flash, session, jsonify)

import requests
import json

from flask_debugtoolbar import DebugToolbarExtension

from sqlalchemy import (asc, desc) 

from flask_bcrypt import Bcrypt

from model import *

from month_func import *
from signIn_func import *
from signUp_func import *

#for searlizing sqlalchemy objects
from flask_marshmallow import Marshmallow


#for facebook sign in
import facebook
#for environmental variables for google/facebook API
import os
#for state
import datetime


app = Flask(__name__, template_folder='./public/')
bcrypt = Bcrypt(app)
#for marshmellow searliazer to work
ma = Marshmallow(app)


app.secret_key = "pouring monday"

@app.route('/')
def index():
    """ Render index.html"""

    return render_template("index.html")

@app.route('/signUp', methods=['POST'])
def signUp():
    """ Check if Email vaild 
        Check if password vaild
        Check if Email in DB
        Add to session and DB or and/or send status to JS
        Return json of status: 'you have successfully signed Up'  or 'email or password not valid' or 'please chose a different email'
            isLoggedIn: boolean
    """

    clear_old_session()

    email1 = requests.args.get("email1")
    email2 = requests.args.get("email2")
    password1 = requests.args.get("password1")
    password2 = request.args.get("password2")

    status = {"status": "error"}

    if not check_matching(email1, email2):
        status["email match"] = "Your emails do not match"
    if not check_matching(password1, password2):
        status["password match"] = "Your passwords do not match"
    if not email_valid(email1):
        status["email invalid"] = "Your email is not valid" 
    if not email_in_db(email):
        status["email unavailable"] = "Please try a differnt email"
    if not check_password(password1).keys()[0]:
        status["password invalid"] = check_password(password1).values()[0]

    if len(status.keys()) == 1:
        signup_db_session(email1, password1)
        status["status"] = "ok"
        status["isLoggedIn"] = True
    
    return jsonify(status)


@app.route('/signIn', methods=["POST"])
def signIn():
    
    """ Check if Email in DB
        Check if password valid
        Add to Session and/or send status to JS
        Return json of status: 'ok' or status: 'email or password are not valid'
        isLoggedIn: boolean
    """

    clear_old_session()

    email = requests.args.get("email")
    password = requests.args.get("password")
    
    status = {"status": "error"}

    if not email_in_db(email):
        status["email"] = "Your email does not match our records"
    elif not confirm_password(email, password):
        status["password"] = "Your password does not match our records"
    else:
        add_to_session(email)
        status["status"] = "ok"

    return jsonify(status)


@app.route('/signOut', methods=["DELETE"])
def signOut():
    """ Clear Session
        Return json of status: 'you have signed out' isLoggedIn: false
    """

    clear_old_session()

    return jsonify({"status" : "ok"})

@app.route('/month')
def month(month, year):
    """ Retrieve DB Info for today's month/year for intial load
        Return json of date:{adj1: adj, adj2: adj, adj3: adj, color: hex}
    """

    month = request.args.get("month")
    year = request.args.get("year")
    

    if not is_month(month, year):
        establish_month(month, year)
    gather_all_month(month, year)


@app.route('/calendar')
def calendar():
    """ Retrieve all date history from DB
        Return json of dateHistory:[month-year, month-year, etc]
    """

    pass




if __name__ == "__main__":

    app.debug = True

    connect_to_db(app)

    DebugToolbarExtension(app)

    app.run(host="0.0.0.0", port=5000)