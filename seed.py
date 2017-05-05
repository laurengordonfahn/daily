from sqlalchemy import func
from model import Colorset

from model import connect_to_db, db
from server import app


def load_colorset():
    """ Load colors and emotions for colorset table """

    Colorset.query.delete()

    neutral = Colorset(user=0, emotion='neutral', colorHex='#ffffff', colorName="white")
    angry = Colorset(user=0, emotion='angry', colorHex='#ff0000', colorName="red")
    happy = Colorset(user=0, emotion='happy', colorHex='#ffff00', colorName="yellow")
    joyful = Colorset(user=0, emotion='joyful', colorHex='#ff9999', colorName="soft pink")
    calm = Colorset(user=0, emotion='calm', colorHex='#00ccff', colorName="light blue")
    sad = Colorset(user=0, emotion='sad', colorHex='#336699', colorName="grey blue")
    quite = Colorset(user=0, emotion='quite', colorHex='#66ff66', colorName="light green")
    lonely = Colorset(user=0, emotion='lonely', colorHex='#cc99ff', colorName="light purple")
    confussed = Colorset(user=0, emotion='confussed', colorHex='#00ff00', colorName="vibrant green")
    anxious = Colorset(user=0, emotion='anxious', colorHex='#cc0099', colorName="magenta")
    trapped = Colorset(user=0, emotion='trapped', colorHex='#ff6600', colorName="orange")
    
    db.session.add(neutral)
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