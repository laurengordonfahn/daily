# Functions to support /signIn
from flask import (Flask, request, render_template, flash, session, jsonify, abort)
from model import *
from sqlalchemy import update

#parse_day, parse_month, parse_year from month_func

def commit_adj_to_db(user_id, day, month, year, newAdj, adjNum):
    """ Take in updated adj and add to DB 
        Return None
    """

    update_dict = {str(adjNum) : newAdj}
    
    Day.query.filter_by(user_id=user_id, day=day, month=month, year=year).update(update_dict)
    
    db.session.commit()
    
    return 