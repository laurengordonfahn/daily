from flask import (Flask, request, render_template, redirect, flash, session, jsonify)

import requests
import json

from flask_debugtoolbar import DebugToolbarExtension

from sqlalchemy import (asc, desc) 

from model import *

from helper_functions import *

#for searlizing sqlalchemy objects
from flask_marshmallow import Marshmallow


#for facebook sign in
import facebook
#for environmental variables for google/facebook API
import os
#for state
import datetime


app = Flask(__name__)
#for marshmellow searliazer to work
ma = Marshmallow(app)


app.secret_key = "pouring monday"

@app.route('/')
def index():
    """ Render index.html"""

    return render_template("./public/index.html")

@app.route('/month')
def month():
    """ Retrieve DB Info for today's month/year for intial load
        Return json of date:{adj: [adj, adj, adj], color: hex}
    """
    pass


@app.route('/calendar')
def calendar():
    """ Retrieve all date history from DB
        Return json of dateHistory:[month/year, month/year, etc]
    """

    pass
