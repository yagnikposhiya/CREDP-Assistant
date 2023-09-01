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


def getStudentAttendanceData(usermessage):
  # base_link = 'https://credp-backend.onrender.com/student-attendance/6/2023-08-29'
  # link = ''
  # input_date = ''
  
  # if usermessage.startswith('/student-attendance-summary'):
  #   input_date = str(usermessage.split('/student-attendance-summary ',1)[1])
  #   link = base_link + input_date

  # if usermessage.startswith('/student-attendance'):
  #   input_params = usermessage.split(' ')
  #   link = base_link + str(input_params[2]) + '/' + str(input_params[1])
    
  
  fetched_data = requests.get('https://credp-backend.onrender.com/volunteer-attendance/2023-08-29')
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

  if usermessage.startswith('/student-attendance-summary') or usermessage.startswith('/student-attendance'):
    attendance_summary = getStudentAttendanceData(usermessage)
    return attendance_summary

  if usermessage.startswith('/volunteer-attendance'):
    return str('Available soon!')
