from sqlalchemy import func
from model import Colorset

from model import connect_to_db, db
from server import app


def load_colorset():
    """ Load colors and emotions for colorset table """

    Colorset.query.delete()

    neutral = Colorset(emotion='neutral', color='#ffffff')
    angry = Colorset(emotion='angry', color='#ff0000')
    happy = Colorset(emotion='happy', color='#ffff00')
    joyful = Colorset(emotion='joyful', color='#ff9999')
    calm = Colorset(emotion='calm', color='#00ccff')
    sad = Colorset(emotion='sad', color='#336699')
    quite = Colorset(emotion='quite', color='#66ff66')
    lonely = Colorset(emotion='lonely', color='cc99ff')
    confussed = Colorset(emotion='confussed', color='00ff00')
    anxious = Colorset(emotion='anxious', color='#cc0099')
    trapped = Colorset(emotion='trapped', color='#ff6600')
    
    
    db.session.add(angry)
    db.session.add(happy)
    db.session.add(joyful)
    db.session.add(calm)
    db.session.add(sad)
    db.session.add(quite)
    db.session.add(lonely)
    db.session.add(confussed)
    db.session.add(anxious)
    db.session.add(trapped)


    db.session.commit()


def load_all():
    load_colorset()

if __name__ == "__main__":
    connect_to_db(app)

    db.create_all()

    load_all()