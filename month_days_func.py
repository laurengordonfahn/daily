from flask import (Flask, request, render_template, flash, session, jsonify, abort)
from model import *
from month_content_func import *

def format_dayArray(month, year, user_id):
    """ Return array of day-month-year strings """

    days_array = gather_all_month_content(month, year, user_id)
    print ("days_array", days_array);
    dayArray = []

    for obj in days_array:
        formated = format_date_string(obj)
        print ("formated value in format_dayArray", formated)
        dayArray.append(formated)
    print("month_func format_dayArray output", dayArray)
    return dayArray