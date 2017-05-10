from flask import (Flask, request, render_template, flash, session, jsonify, abort)
from model import *
from gen_server_func import *

def updateColor(user_id, dayDate, colorId):
    """ Take in new colorEmot for user_id and dayDate Update DB
        Return None
    """
    day = parse_day(dayDate)
    month = parse_month(dayDate)
    year = parse_year(dayDate)

    # color_id = query_colorset_table(colorId)

    update_dict = { "colorset_id" : str(colorId)}
    
    Day.query.filter_by(user_id=user_id, day=day, month=month, year=year).update(update_dict)
    
    db.session.commit()
    
    return 