from flask import (Flask, request, render_template, flash, session, jsonify, abort)
from model import *
from sqlalchemy import desc

#for creating days in a given month
from datetime import timedelta, datetime
#for facebook environmental variable
import os
import facebook
#for seralization of db obj
from flask_marshmallow import Marshmallow



def query_month_year(user_id):
    """Gather all month and year  from db
        Return array of month and year group by  """


    sql = "SELECT month, year FROM days WHERE user_id=%d GROUP BY month, year" % int(user_id)

    cursor = db.session.execute(sql)
    dateRange = cursor.fetchall()

    print ("dateRange", dateRange)

    return dateRange
    

def format_dateRange(tupArr):
    """ Takes in a tuple array of month and years integers
        Returns an array of string m/y 
    """
    dateArr= []
    for tup in tupArr:
        dateStr= str(tup[0]) + "/" + str(tup[1])

        dateArr.append(dateStr)
    print ("dateArr", dateArr)
    
    return dateArr

