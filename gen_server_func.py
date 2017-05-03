# Functions to support more than one route of server
from flask import (Flask, request, render_template, flash, session, jsonify, abort)
from model import *
from flask_bcrypt import Bcrypt
import re

#signIn/ signUp
def clear_old_session():
    """ Deletes Session 
        Returns None
    """
    if 'current_user' in session:
        del session['current_user']

#signIn/ signUp
def email_in_db(email):
    """ Query DB see if email already in DB
        Return Boolean
    """
    checkEmail = User.query.filter_by(email=email).first() 

    print("email_inn_db running from general func", checkEmail)

    if checkEmail:
        return True
    return False

#month_content/month_adj
def parse_day(dateString):
    """ Return day integer """
    try:
        day = int(dateString.split("-")[0])
        if day:
            return day  
    except TypeError:
        print("parse_day in month endpoint does not have valid input")
        raise

def parse_month(date):
    """ Return month integer """

    try:
        month = int(date.split("-")[1])
        if month:
            return month  
    except TypeError:
        print("parse_month in month endpoint does not have valid input")
        raise

def parse_year(date):
    """ Return year integer """

    try:
        year = int(date.split("-")[2])
        if year:
            return year  
    except TypeError:
        print("parse_year in month endpoint does not have valid input")
        raise