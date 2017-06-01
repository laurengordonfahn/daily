from flask import (Flask, request, render_template, flash, session, jsonify, abort)
from model import *
from calendar_options_func import query_month_year
# from calendar_color_func import get_color_options
import calendar_color_func

def parse_emotion(arrDays):
    """ Takes in object array of days from DB 
        Return array only colorId 
    """
    emotionArr = []

    for obj in arrDays:

        emotionArr.append(obj.colorset_id)

    return emotionArr

def colorOrder(user_id):
    """ Gather the order of the colors for the user in the DB
        Return"""

    colorOptions = calendar_color_func.get_color_options(user_id)

    colorOrder = []
    for obj in colorOptions:
        id = obj.id
        emotion = obj.emotion
        colorOrder.append({ id : emotion })
    return colorOrder


def create_emotion_chronology(user_id):
    """ Return dict of all days array of a user and a dict of all days by month """
    month_year_options = query_month_year(user_id)

    all_days = []
    all_days_by_month = {}

    for tup in month_year_options:
        month = tup[0]
        year = tup[1]
        dateStr = str(month) + "/" + str(year)
    
        day_month_arr = Day.query.filter_by(month=month, year=year, user_id=user_id).order_by(Day.day).all()

        parsed_by_color_id = parse_emotion(day_month_arr)

        all_days.extend(parsed_by_color_id)

        all_days_by_month[dateStr] = parsed_by_color_id 

    return {"all_days" : all_days, "all_days_by_month" : all_days_by_month }


def create_emotion_count(user_id):
    """ For each emotion create count b4 and after relationships
        Return ["emotion": {before:[], after: []}, etc]
    """
    #TODO: I did not parse each month("all_days_by_month")

    all_days = create_emotion_chronology(user_id)["all_days"]
    colorOrd = colorOrder(user_id)

    emotionsCounts = []
    
    for colorDict1 in colorOrd:
        colorId1 = colorDict1.keys()[0]
        emotion1 = colorDict1[colorId1]

        counter2 = 0
        before = [0] * len(colorOrd)
        after = [0] * len(colorOrd)

        emotionCount = {"before" : before, "after" : after}

        for colorDict2 in colorOrd:
            colorId2 = colorDict2.keys()[0]
            emotion2 = colorDict2[colorId2]
            print ("color/emotion2", colorId2, emotion2)

            i = 0
            j = 1

            
            while i < (len(all_days) - 1):
                
                if ((all_days[i] == colorId2) and (all_days[j] == colorId1)):
                    emotionCount["before"][counter2] = (emotionCount["before"][counter2] + 1)

                if ((counter2 != 0) and (all_days[i] == colorId1) and (all_days[j] == colorId2)):
                    emotionCount["after"][counter2] = (emotionCount["after"][counter2] + 1)
                i += 1
                j += 1
            counter2 += 1
        emotionsCounts.append({ emotion1 : emotionCount }) 
            
    return emotionsCounts






       










