from flask import (Flask, request, render_template, flash, session, jsonify, abort)
from model import *
from sqlalchemy import desc

#for creating days in a given month
from datetime import timedelta, datetime
#for facebook environmental variable
import os
import facebook


def is_month(month, year):
    """ Query Month and Year established in DB
        Returns True or False 
    """

    if Day.query.all():

        return True

def create_days_month(month, year):
    """ Create and Return array of string days in a given month
        ['dd-mm-yyyy', etc ... ]
    """
    day = timedelta(days=1)
    date1 = datetime(year, month, 1)
    d = date1
    dates = []

    while d.month == month:
        dates.append(d.strftime('%d-%m-%Y'))
        d += day

    return dates

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
        month = int(dateString.split("-")[1])
        if month:
            return month  
    except TypeError:
        print("parse_month in month endpoint does not have valid input")
        raise

def parse_year(date):
    """ Return year integer """

    try:
        year = int(dateString.split("-")[2])
        if year:
            return year  
    except TypeError:
        print("parse_year in month endpoint does not have valid input")
        raise

def establish_month(month, year, user_id):
    """ Create Blank New Month if Month not in DB
        Returns None
    """
    dates = create_days_month(month, year)

    for date in dates:

        day = parse_day(date)
        month = parse_month(date)
        year = parse_year(date)

        row = Day(user_id=user_id, day=day, month=month, year=year, adj1="", adj2="", adj3="", colorset_id=1)
        db.session.add(row)
        db.session.commit()


def gather_all_month_content(month, year, user_id):
    """ Return all information form a particular Month """

    return Day.query.filter_by(user_id=user_id, month=month, year=year).order_by(Day.day).all()

def format_date_string(obj):
    """ Take in a db obj form Day table 
        Return date string "dd-mm-yyyy"
    """

    return str(obj.day) + "-" + str(obj.month) + "-" + str(obj.year) 

def format_date_content_dict(obj):
    """ Take in a db obj from Day table
        Return day content dict  {"adj1": "adj", "adj2": "adj", "adj3": "adj", "colorSet": "#hex"}
    """
    content = {}
    content["adj1"] = obj.adj1
    content["adj2"] = obj.adj2
    content["adj3"] = obj.adj3
    content["color"] = obj.colorSet

    return content

def format_dayContent(month,year, user_id):
    """ Return formated month content in state formated
        {"day-month-year": {"adj1": "adj", "adj2": "adj", "adj3": "adj", "colorSet": "#hex"}, etc..}
    """
    dayContent = {}

    days_array = gather_all_month_content(month, year, user_id)

    for obj in days_array:
        date_string = format_date_string(obj)
        dayContent[date_string] = format_date_content_dict(obj)

    return dayContent


def format_dayArray(month, year, user_id):
    """ Return array of day-month-year strings """

    days_array = gather_all_month_content(month, year, user_id)
    dayArray = []

    for obj in days_array:
        dayArray.append(format_date_string(obj))
    return dayArray

def query_month_year(month, year, user_id):
    """Gather all month and year  from db
        Return array of month and year group by  """

    dateRange = Day.query.filter_by(user_id=user_id).group_by(Day.month, Day.year).all()

def format_dateRange():
    """ Return all possible month/year combo in array for state format dateRange
        ["month/year", "month/year", etc ...]
    """

    dates_array = query_month_year(month, year, user_id)

    dateRange = []

    for obj in dateRange_array:
        dateRange.append(str(obj.month) + "/" + str(obj.year))
    return dateRange


