from flask_sqlalchemy import SQLAlchemy
#python World Time Zone
import pytz 
#for onupdate
import datetime

db = SQLAlchemy()

def connect_to_db(app, url = 'postgresql:///daily'):
    """ Connect the database to our Flask app. """
    app.config['SQLALCHEMY_DATABASE_URI'] = url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = app
    db.init_app(app)
    app.config['SQLALCHEMY_ECHO'] = True


class AwareDateTime(db.TypeDecorator):
    """ Results returned as aware datetimes, not naive ones.
    sourced from: 
    http://stackoverflow.com/questions/23316083/sqlalchemy-how-to-load-dates-with-timezone-utc-dates-stored-without-timezone
    """
    impl = db.DateTime
    def process_result_value(self, value, dialect):
        return value.replace(tzinfo=pytz.utc)

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email= db.Column(db.String(100), nullable=False)
    password=db.Column(db.String(128), nullable=False, unique=False)
    start_at= db.Column(AwareDateTime, default=db.func.now(), nullable=False)

class Day(db.Model):
    __tablename__ = "days"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    day = db.Column(db.Integer, nullable=False)
    month = db.Column(db.Integer, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    adj1 = db.Column(db.String(100), nullable=True)
    adj2 = db.Column(db.String(100), nullable=True)
    adj3 = db.Column(db.String(100), nullable=True)
    colorset_id = db.Column(db.Integer, nullable=True)

class Colorset(db.Model):
    __tablename__ = "colorsets"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    emotion = db.Column(db.String(50), nullable=False)
    color = db.Column(db.String(7), nullable=False)
