from flask import (Flask, request, render_template, flash, session, jsonify, abort)
from model import *

def get_color_options(user_id):
    """ Query all DB for user's colorset basic=0 or basic=user_id
        Return array of obj rows 
    """

    user_id = int(user_id)
    print "get_color_options", db.session.query(Colorset).filter(Colorset.basic.in_([0, user_id])).all()
    return db.session.query(Colorset).filter(Colorset.basic.in_([0, user_id])).all()


def format_color_response(user_id):
    """ Format into dict colorset table
        Return {id: id, emotion: emotion, color:color}
    """

    all_color_row = get_color_options(user_id)

    response = []

    for row in all_color_row:
        response.append({
            'colorId': row.id,
            'basic' : row.basic,
            'emotion': row.emotion,
            'colorHex': row.colorHex,
            'colorName' : row.colorName
            })
    return response
