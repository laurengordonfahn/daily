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
    weekday = db.Column(db.Integer, nullable=False)
    day = db.Column(db.Integer, nullable=False)
    month = db.Column(db.Integer, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    adj1 = db.Column(db.String(100), nullable=True)
    adj2 = db.Column(db.String(100), nullable=True)
    adj3 = db.Column(db.String(100), nullable=True)
    colorset_id = db.Column(db.Integer, db.ForeignKey('colorsets.id'))

class Colorset(db.Model):
    __tablename__ = "colorsets"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user = db.Column(db.Integer, nullable=False)
    emotion = db.Column(db.String(50), nullable=False)
    colorHex = db.Column(db.String(7), nullable=False)
    colorName = db.Column(db.String(50), nullable=False)

def example_data():
    """ Create sample data"""

    u1 = User(email="b@gmail.com", password="$2b$12$Edbbjnze6056IfH2MhEA8OZma17nTej2yayG7M7ZU25NXL30vLDVC", start_at="2017-05-06 22:10:26.590767")
    u2 = User(email="c@gmail.com", password="$2b$12$///ykrQ6fIsw6lSlCPuUXOsU2MWeCCn53Fq8Bm1KowRniEzaLbShG", start_at="2017-05-06 22:10:26.590767")
    u3 = User(email="d@gmail.com", password="$2b$12$ozPFF5RgzpbQeVV9DyVufujU2Sm.4pGlQP.rJN3bD2.83f2ldt58q", start_at="2017-05-06 22:10:26.590767")
    db.session.add_all([u1, u2, u3])
    db.session.commit()

    c1 = Colorset(user=0, emotion="neutral", colorHex="#ffffff", colorName="white") 
    c2 = Colorset(user=0, emotion="sad", colorHex="#fd0000", colorName="blue")
    c3 = Colorset(user=2, emotion="happy", colorHex="#b04e00", colorName="yellow")

    db.session.add_all([c1, c2, c3])
    db.session.commit()

    d1 = Day(user_id=1, weekday=0, day=31, month=4, year=1986, adj1="happy", adj2="angry", adj3="sad", colorset_id=1)

    d2 = Day(user_id=2, weekday=1, day=1, month=5, year=2017, adj1="joyous", adj2="funky", adj3="crappy", colorset_id=2)

    d3 = Day(user_id=3, weekday=2, day=15, month=11, year=2016, adj1="lively", adj2="depressed", adj3="cramped", colorset_id=3)

    db.session.add_all([d1, d2, d3])
    db.session.commit()

if __name__ == '_main_':
    from server import app

    connect_to_db(app)
    print "Connected to DB."
