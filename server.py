from flask import (Flask, request, render_template, redirect, flash, session, jsonify)

import requests
import json

from flask_debugtoolbar import DebugToolbarExtension

from sqlalchemy import (asc, desc) 

from model import *

from month_func import *

#for searlizing sqlalchemy objects
from flask_marshmallow import Marshmallow


#for facebook sign in
import facebook
#for environmental variables for google/facebook API
import os
#for state
import datetime


app = Flask(__name__, template_folder='./public/')
#for marshmellow searliazer to work
ma = Marshmallow(app)


app.secret_key = "pouring monday"

@app.route('/')
def index():
    """ Render index.html"""

    return render_template("index.html")

@app.route('/month/')
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