"""
Author: Yagnik Poshiya
GitHub: @yagnikposhiya
Charusat Rural Education Development Program
Charotar University of Science and Technology
"""
import json
import datetime
import requests
import pytz

def getStudentAttendanceData():
  fetched_data = requests.get('')
  json_format_data = json.loads(fetched_data.text)
  return json_format_data

def getVolunteerAttendanceData():
  fetchd_data = requests.get('')
  json_format_data = json.loads(fetchd_data.text)
  return json_format_data

def getDayFromDate(date):
  try:
    date_object = datetime.datetime.strptime(date,'%d-%m-%Y').date()
    day = date_object.strftime('%A')
    return day
  except:
    return 'Invalid date format'

def handleResponse(username,usermessage):

  if usermessage=='/hello':
    return 'Hey there!'

  if usermessage=='//help':
    return 'Use /hello, /student-attendance, /volunteer-attendance commands'

  if usermessage.startswith('/student-attendance'):
    attendance_summary = getStudentAttendanceData()
    day_or_warning = getDayFromDate(usermessage.split('/student-attendance ',1)[1])

    if (usermessage.split('/student-attendance ',1)[1] in attendance_summary.keys()) and (day_or_warning!='Invalid date format'):
      print('Working')

    else:
      return 'DataFormatError:\nNo data found! or Invalid date format!. Input date format must be DD-MM-YYYY.'