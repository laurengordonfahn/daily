from flask import (Flask, request, render_template, redirect, flash, session, jsonify)

#To be deleted
# import requests
# from sqlalchemy import (asc, desc)
#for facebook sign in
# import facebook
# #for environmental variables for google/facebook API
# import os

import json

from flask_debugtoolbar import DebugToolbarExtension
from flask_bcrypt import Bcrypt

from model import *

from gen_server_func import *
from month_content_func import *
from calendar_func import *
from signIn_func import *
from signUp_func import *
from month_adj_func import * 

#for searlizing sqlalchemy objects
from flask_marshmallow import Marshmallow
# for '/signIn' creating nested dictionaries
import collections

#for state
import datetime


app = Flask(__name__, template_folder='./public/')
bcrypt = Bcrypt(app)
#for marshmellow searliazer to work
ma = Marshmallow(app)

app.secret_key = "pouring monday"

###################### class for Marshmellow #############################
class UserSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('month', 'year')

user_schema = UserSchema()
users_schema = UserSchema(many=True)
#####################################################

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
        Return {status: 'ok' or 'error',  
               notices: {},
               isLoggedIn: boolean }
    """

    clear_old_session()

    email1 = request.form.get("email1")
    email2 = request.form.get("email2")
    password1 = request.form.get("password1")
    password2 = request.form.get("password2")

    d = collections.defaultdict(dict)
    response = {
        "status" : None,
        "notices" : d,
        "isLoggedIn" : None
    }

    if not check_matching(email1, email2):
        response["notices"]["email match"] = "Your emails do not match"
    if not check_matching(password1, password2):
        response["notices"]["password match"] = "Your passwords do not match"
    if not email_valid(email1):
        response["notices"]["email invalid"] = "Your email is not valid" 
    if email_in_db(email1):
        response["notices"]["email unavailable"] = "Please try a differnt email"
    if check_password(password1):
        response["notices"]["password invalid"] = check_password(password1)
        
    if not response["notices"]:
        signup_db_session(email1, password1, app)
        response["status"] = "ok"
        response["isLoggedIn"] = True
    else:
        response["status"] = "ok"
        response["isLoggedIn"] = False
    print ("response signUp", response)
    return jsonify(response)


@app.route('/signIn', methods=["POST"])
def signIn():
    
    """ Check if Email in DB
        Check if password valid
        Add to Session and/or send notice to JS
        Return json of {status: 'ok' or error, 
                        notices: 'email or password are not valid',
                        isLoggedIn: boolean }
    """

    clear_old_session()

    email = request.form.get("email")
    password = request.form.get("password")
    
    d = collections.defaultdict(dict)
    response = {
        "status" : None,
        "notices" : d,
        "isLoggedIn" : None
    }

    #TODO: Handle Error Messages status: "error" error: {code/msg}
    if not email_in_db(email):
        response["notices"]["email"] = "Your email does not match our records"
    if not confirm_password(email, password, app):
        response["notices"]["password"] = "Your password does not match our records"
    if response["notices"]: 
        response["status"] = "ok"
        response["isLoggedIn"] = False  
        print (response["isLoggedIn"], "signIn sending")  
        return jsonify(response)

    add_to_session(email)
    response["status"] = "ok"
    response["notices"]["welcome"] = "Welcome to Daily!"
    response["isLoggedIn"] = True

    print (response["isLoggedIn"], "signIn sending")
    return jsonify(response)


@app.route('/signOut', methods=["DELETE"])
def signOut():
    """ Clear Session
        Return json of status: 'you have signed out' isLoggedIn: false
    """

    clear_old_session()

    return jsonify({"status" : "ok"})

@app.route('/month/content', methods=["POST", "GET"])
def month_content():
    """ Retrieve DB Info for today's month/year for intial load
        Return json of date:{adj1: adj, adj2: adj, adj3: adj, color: hex}
    """
    print ("Current user", session['current_user'])
    if session['current_user']:

        month = request.form.get("month")
        year = request.form.get("year")
        user_id = session['current_user']

        if not is_month(month, year, user_id):
            establish_month(month, year, user_id)

        d = collections.defaultdict(dict)
        response = {
            "status": None,
            "dayContent" : d
        }

        dayContentDict=format_dayContent(month, year, user_id)
        
        if dayContentDict:
            response["status"] = "ok"
            response["dayContent"] = dayContentDict
        
    return jsonify(response)

     # TODO: I need to be able to control isLoggedIn from here as well and return a notice message saying something went wrong!

@app.route('/month/adj', methods=["POST"])
def month_adj():
    """ Update DB with new adjective """

    user_id = session['current_user']
    dayDate = request.form.get("dayDate")
    newVal = request.form.get("newVal")
    elemName = request.form.get("ElemName")

    day = parse_day(dayDate)
    month = parse_month(dayDate)
    year = parse_year(dayDate)

    commit_adj_to_db(user_id, day, month, year, newVal, elemName)

    #TODO handle errors from commit_adj_to_db 
    response = {"status" : "ok"}

    return jsonify(response)


@app.route('/calendar/options')
def calendar_options():
    """ Retrieve all date history from DB
        Return json of dateHistory:[month-year, month-year, etc]
    """
    user_id = session['current_user']

    if user_id:
        response = {
            "status": None,
            "dateRange" : []
        }
        
        possibleDateArr = query_month_year(user_id)

        if not possibleDateArr:
            return jsonify({"status" : "error"})

        response["dateRange"] = format_dateRange(possibleDateArr)
        #Todo: Add dateArray infor to response
        response["status"] = "ok"
        print ("response calendar", response)
        return jsonify(response)
    #TODO How handle if no user- id send to homepage but notices?

@app.route('/month/days')
def month_days():
    """ Retrieve all dates of a given month/year
        Return json of dateArray:[day-month-year, day-month-year, etc]
    """
    user_id = session['current_user']
    month = request.args.get("month")
    year = request.args.get("year")
    
    print("month/day running")
    print (month, year)
    if user_id:
        
        response = {
            "status": None,
            "dateArray" : []
        }
        possibleDateArr = format_dayArray(month, year, user_id)

        if not possibleDateArr:
            return jsonify({"status" : "error"})

        response["dateArray"] = possibleDateArr
        #Todo: Add dateArray infor to response
        response["status"] = "ok"
        print ("response month/day", response)
        return jsonify(response)
    #TODO How handle if no user- id send to homepage but notices?


if __name__ == "__main__":

    app.debug = True

    connect_to_db(app)

    DebugToolbarExtension(app)

    app.run(host="0.0.0.0", port=5000)