from flask import (Flask, request, render_template, flash, session, jsonify, abort)
from model import *
from gen_server_func import parse_day, parse_month, parse_year
#for creating days in a given month
from datetime import timedelta, datetime


def is_month(month, year, user_id):
    """ Query Month and Year established in DB
        Returns True or False 
    """
    
    if Day.query.filter_by(month=month, year=year, user_id=user_id).first():
        
        return True


def create_days_month(month, year):
    """ Create and Return array of string days in a given month
        ['dd-mm-yyyy', etc ... ]
    """
    
    day = timedelta(days=1)
    d = datetime(int(year), int(month), 1)
    dates = []

    while d.month == int(month):
        dates.append(d.strftime('%d-%m-%Y'))
        d += day
    
    print("dates, dates, dates, dates", dates)
    return dates

def parse_weekday(date):
    """ Take in date '%d-%m-%Y'
        Return integer representing day of week 0-6
    """
    print ("date", date, type(date))
    return datetime.datetime.strptime(date, '%d-%m-%Y').strftime('%w')

def establish_month(month, year, user_id):
    """ Create Blank New Month if Month not in DB
        Returns None
    """
    dates = create_days_month(month, year)

    print dates

    for date in dates:

        day = parse_day(date)
        month = parse_month(date)
        year = parse_year(date)
        weekday = parse_weekday(date)

        row = Day(user_id=user_id, weekday=weekday,day=day, month=month, year=year, adj1="", adj2="", adj3="", colorset_id=1)
        db.session.add(row)
        db.session.commit()


def gather_all_month_content(month, year, user_id):
    """ Return all information form a particular Month """
    
    # return Day.query.filter_by(user_id=user_id, month=month, year=year).order_by(Day.day).all()
    # sql = db.session.execute("SELECT d.day, d.month, d.year, d.adj1, d.adj2, d.adj3, d.colorset_id, c.emotion, c.color FROM days AS d LEFT JOIN colorsets as c ON d.colorset_id=c.id").fetchall()

    sql = db.session.query(Day, Colorset).filter(Day.colorset_id == Colorset.id).filter(Day.user_id == user_id).order_by(Day.day).all()

    print ("SQL gather_all_month_content", sql)

    return sql

def format_date_string(tup):
    """ Take in a db tup of Day and Colorset obj form Day/Colorset Join table 
        Return date string "dd-mm-yyyy"
    """

    return str(tup[0].day) + "-" + str(tup[0].month) + "-" + str(tup[0].year) 

def format_date_content_dict(tup):
    """ Take in a db obj from Day table
        Return day content dict  {"adj1": "adj", "adj2": "adj", "adj3": "adj", "colorHex": "#hex", "colorEmot": "emotion", "colorName": "color", "colorset_id" : "id"}
    """
    content = {}
    content["adj1"] = tup[0].adj1
    content["adj2"] = tup[0].adj2
    content["adj3"] = tup[0].adj3
    content["weekeday"] = tup[0].weekday
    content["colorHex"] = tup[1].colorHex
    content["colorName"] = tup[1].colorName
    content["colorEmot"] = tup[1].emotion
    content["colorId"] = tup[1].id

    print ("content from format_date_content_dict", content)
    return content

def format_dayContent(month, year, user_id):
    """ Return formated month content in state formated
        {"day-month-year": {"adj1": "adj", "adj2": "adj", "adj3": "adj", "colorHex": "#hex","colorEmot": "emotion","colorName": "color", "colorset_id" : "id"}, etc..}
    """
    dayContent = {}

    days_array = gather_all_month_content(month, year, user_id)

    for tup in days_array:
        date_string = format_date_string(tup)
        dayContent[date_string] = format_date_content_dict(tup)



    return dayContent
