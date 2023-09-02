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


def getDateInYMDFormat(date):
  input_date = datetime.datetime.strptime(date,"%d-%m-%Y")
  output_date = input_date.strftime("%Y-%m-%d")
  return str(output_date)


def getDayFromDate(date):
  try:
    date_object = datetime.datetime.strptime(date, '%d-%m-%Y').date()
    day = date_object.strftime('%A')
    return day
  except:
    return str('DateFormatError:\nEither input date is invalid or it must be in DD-MM-YYYY format.')


def getStudentAttendanceData(usermessage):
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  base_link = 'https://credp-backend.onrender.com/student-attendance/'
  link = ''
  input_date = ''
  
  if usermessage.startswith('/student-atdsum'):
    try:
      input_date = usermessage.split(' ')
      day = getDayFromDate(input_date[1])

      if day not in days:
        return day
      
      return_date = input_date[1]
      YMD_format_date = getDateInYMDFormat(input_date[1])
      if len(input_date) < 3:
        link = base_link + YMD_format_date
      else:
        return str('CommandFormatError:\nOnly date in the DD-MM-YYYY format is acceptable for /student-atdsum command.')
    except:
      return str('CommandFormatError:\nDate not found, must be in the DD-MM-YYYY format.')

  elif usermessage.startswith('/student-atd'):
    try:
      input_params = usermessage.split(' ')
      day = getDayFromDate(input_params[1])

      if day not in days:
        return day
      
      return_date = input_params[1]
      YMD_format_date = getDateInYMDFormat(input_params[1])
      if len(input_params) < 4:
        link = base_link + str(input_params[2]) + '/' + YMD_format_date
      else:
        return str('CommandFormatError:\nOnly date in the DD-MM-YYYY format & single standard is acceptable for /student-atd command.')
    except:
      return str('CommandFormatError:\nEither date or standard not found, must be in the <DD-MM-YYYY> <STD> format.')
  
  fetched_data = requests.get(link)
  json_format_data = json.loads(fetched_data.text)

  if len(json_format_data) > 0:
    return json_format_data
  else:
    if usermessage.startswith('/student-atdsum'):
      return 'Data is not available for {gd}.'.format(gd=return_date)
    elif usermessage.startswith('/student-atd'):
      return 'Data is not available for {gd} & {cls} standard.'.format(gd=return_date,cls=input_params[2])


def getVolunteerAttendanceData():
  fetchd_data = requests.get('')
  json_format_data = json.loads(fetchd_data.text)
  return json_format_data


def handleResponse(username, usermessage):

  if usermessage == '/hello':
    return 'Hey there!'

  if usermessage == '//help':
    return 'Use /hello, /student-attendance, /volunteer-attendance commands'

  if usermessage.startswith('/student-atd') or usermessage.startswith('/student-atdsum'):
    attendance_summary = getStudentAttendanceData(usermessage)
    return attendance_summary

  if usermessage.startswith('/volunteer-attendance'):
    return str('Available soon!')
