from sqlalchemy import func
from model import Colorset

from model import connect_to_db, db
from server import app


def load_colorset():
    """ Load colors and emotions for colorset table """

    Colorset.query.delete()

    neutral = Colorset(user=0, emotion='neutral', colorHex='#fdfae7', colorName="white")
    angry = Colorset(user=0, emotion='angry', colorHex='#f63113', colorName="red")
    happy = Colorset(user=0, emotion='happy', colorHex='#f6e25a', colorName="yellow")
    joyful = Colorset(user=0, emotion='joyful', colorHex='#ff9999', colorName="soft pink")
    calm = Colorset(user=0, emotion='calm', colorHex='#bae3f2', colorName="light blue")
    sad = Colorset(user=0, emotion='sad', colorHex='#336699', colorName="grey blue")
    quite = Colorset(user=0, emotion='quite', colorHex='#c1f2ba', colorName="light green")
    lonely = Colorset(user=0, emotion='lonely', colorHex='#d0d0e5', colorName="light purple")
    confussed = Colorset(user=0, emotion='confussed', colorHex='#30c942', colorName="vibrant green")
    anxious = Colorset(user=0, emotion='anxious', colorHex='#962686', colorName="magenta")
    trapped = Colorset(user=0, emotion='trapped', colorHex='#ffa024', colorName="orange")
    
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