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
    date_object = datetime.datetime.strptime(date, '%d-%m-%Y').date()
    day = date_object.strftime('%A')
    return day
  except:
    return 'Invalid date format'


def handleResponse(username, usermessage):

  if usermessage == '/hello':
    return 'Hey there!'

  if usermessage == '//help':
    return 'Use /hello, /student-attendance, /volunteer-attendance commands'

  if usermessage.startswith('/student-attendance'):
    return str('Available soon!')

  if usermessage.startswith('/volunteer-attendance'):
    return str('Updating the database, please wait!')
