"""
Author: Yagnik Poshiya
GitHub: @yagnikposhiya
Charusat Rural Education Development Program (CREDP),
Charotar University of Science and Technology.
"""

import json
import datetime
import requests
import pytz

def get_student_attendance_data():
    fetched_data = requests.get()
    json_format_data = json.loads(fetched_data.text)
    return json_format_data

def get_volunteer_attendance_data():
    fetched_data = requests.get()
    json_format_data = json.loads(fetched_data.text)
    return json_format_data

def get_day_from_date(date):
    try:
        date_object = datetime.datetime.strptime(date,'%d-%m-%Y').date()
        day = date_object.strftime('%A')
        return day
    except:
        return 'Invalid date format'
    
def handle_response(username, usermessage):

    if usermessage=='/hello':
        return 'Hey there!'
    
    if usermessage=='//help':
        return 'Use /hello, /student-attendance, /volunteer-attendance commands'
    
    if usermessage.startswith('/student-attendance'):
        attendance_summary = get_student_attendance_data()

        if (usermessage.split('/student-attendance ',1)[1] in attendance_summary.keys()) and (day_or_warning != 'Invalid date format'):
            day_or_warning = get_day_from_date(str(usermessage.split('/student-attendance ',1)[1]))

        else:
            return 'DataFormatError:\nNo data found! or Invalid date format!. Input date format must be DD-MM-YYYY.'
    

    
