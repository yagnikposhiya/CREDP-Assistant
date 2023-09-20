"""
Author: Yagnik Poshiya
GitHub: @yagnikposhiya
Charusat Rural Education Development Program
Charotar University of Science and Technology
"""

import json
import datetime
import requests
import datashare


# get date in specific format: from DMY to YMD
def getDateInYMDFormat(date):
  input_date = datetime.datetime.strptime(date,"%d-%m-%Y")
  output_date = input_date.strftime("%Y-%m-%d")
  return str(output_date)


# get day from the date
def getDayFromDate(date):
  try:
    date_object = datetime.datetime.strptime(date, '%d-%m-%Y').date()
    day = date_object.strftime('%A')
    return day
  except:
    return str('DateFormatError:\nEither input date is invalid or it must be in DD-MM-YYYY format.')


# fetch student attendance data from the database
def getStudentAttendanceData(usermessage):
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  if usermessage.startswith('/student-atdall'):
    base_link = 'https://credp-backend.onrender.com/student-attendance-all/'
  else:
    base_link = 'https://credp-backend.onrender.com/student-attendance/'
  link = ''
  input_date = ''

  # for student attendance summary (/student-atdsum)
  if usermessage.startswith('/student-atdsum'):
    try:
      input_date = usermessage.split(' ')
      day = getDayFromDate(input_date[1])

      if day not in days:
        return day
      
      return_date = input_date[1]
      YMD_format_date = getDateInYMDFormat(input_date[1])
      if len(input_date) < 4:
        if len(input_date) == 3 and usermessage.split(' ')[-1] != "CSV":
          return str('FileFormatError:\nOnly "CSV" file format is acceptable for /student-atdsum command. The PDF format is available by default.')
        else:
          link = base_link + YMD_format_date
      else:
        return str('CommandFormatError:\nOnly date in DD-MM-YYYY format and "CSV" file format are acceptable for /student-atdsum command.')
    except:
      return str('CommandFormatError:\nDate not found, must be in DD-MM-YYYY format.')

  # for all student attendance (/student-atdall)
  elif usermessage.startswith('/student-atdall'):
    try:
      input_params = usermessage.split(' ')
      day = getDayFromDate(input_params[1])

      if day not in days:
        return day

      return_date = input_params[1]
      YMD_format_date = getDateInYMDFormat(input_params[1])
      if len(input_params) < 4:
        if len(input_params) == 3 and usermessage.split(' ')[-1] != "CSV":
          return str('FileFormatError:\nOnly "CSV" file format is acceptable for /student-atdall command. The PDF format is available by default.')
        else:
          link = base_link + YMD_format_date
      else:
        return str('CommandFormatError:\nOnly date in DD-MM-YYYY format and "CSV" file format are acceptable for /student-atdall command.')

    except:
      return str('CommandFormatError:\nDate not found, must be in DD-MM-YYYY format.')

  # for specific standard student attendance (/student-atd)
  elif usermessage.startswith('/student-atd'):
    try:
      standards = ['1','2','3','4','5','6','7','8','9','10','11','12']
      input_params = usermessage.split(' ')
      day = getDayFromDate(input_params[1])

      if day not in days:
        return day
      
      return_date = input_params[1]
      YMD_format_date = getDateInYMDFormat(input_params[1])
      if len(input_params) < 5:
        if input_params[2] not in standards:
          return str('CommandFormatError:\nStandard not found, Should fall within the range of 1 to 12.')
        elif len(input_params) == 4 and usermessage.split(' ')[-1] != "CSV":
          return str('FileFormatError:\nOnly "CSV" file format is acceptable for /student-atd command. The PDF format is available by default.')
        else:
          link = base_link + str(input_params[2]) + '/' + YMD_format_date
      else:
        return str('CommandFormatError:\nOnly date in DD-MM-YYYY format, single standard, & "CSV" file format (optional) are acceptable for /student-atd command.')
        
    except:
      return str('CommandFormatError:\nEither date or standard not found, must be in <DD-MM-YYYY> <STD> format.')

  # fetch data from the link and convert it into json format
  fetched_data = requests.get(link)
  json_format_data = json.loads(fetched_data.text)

  # handle the case when data not found in the database
  if len(json_format_data) > 0:
    return json_format_data
  else:
    if usermessage.startswith('/student-atdsum') or usermessage.startswith('/student-atdall'):
      return 'Student data is not available for {gd}.'.format(gd=return_date)
    elif usermessage.startswith('/student-atd'):
      return 'Student data is not available for {gd} & {cls} standard.'.format(gd=return_date,cls=input_params[2])


# fetch volunteer attendance data from the database
def getVolunteerAttendanceData(usermessage):
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  base_link = 'https://credp-backend.onrender.com/volunteer-attendance/'
  link = ''

  try:
    input_params = usermessage.split(' ')
    day = getDayFromDate(input_params[1])

    if day not in days:
      return day

    YMD_format_date = getDateInYMDFormat(input_params[1])

    if len(input_params) < 4:
      link = base_link + YMD_format_date
    else:
      return str('CommandFormatError:\nOnly date in DD-MM-YYYY format is acceptable for /volunteer-atd command.')
  
  except:
    return str('CommandFormatError:\nDate not found, must be in DD-MM-YYYY format.')

  # fetch data from the database after generation of link
  fetchd_data = requests.get(link)
  json_format_data = json.loads(fetchd_data.text)

  # handle the case when data not found in the database
  if len(json_format_data) > 0:
    return json_format_data
  else:
    return 'Volunteer data is not available for {gd}.'.format(gd=input_params[1])

# define the function to handle the user messages and CREDP Assistant responses
def handleResponse(username, usermessage):

  if usermessage == '/hello':
    return 'Hey there!'

  if usermessage == '//help':
    return 'Use /hello, /student-atd, /student-atdsum, /student-atdall, /volunteer-atd commands. \nThe CREDP Assistant can also generate attendance reports autonomously.'

  if usermessage.startswith('/student-atd') or usermessage.startswith('/student-atdsum'):
    attendance_summary = getStudentAttendanceData(usermessage)
    if isinstance(attendance_summary,list):
      response_file_path = datashare.getCSVFile(attendance_summary,usermessage,username,'S_')
      return response_file_path
    else:
      return attendance_summary

  if usermessage.startswith('/student-atdall'):
    attendance_summary = getStudentAttendanceData(usermessage)
    if isinstance(attendance_summary,list):
      response_file_path = datashare.getCSVFile(attendance_summary,usermessage,username,'S_')
      return response_file_path
    else:
      return attendance_summary

  if usermessage.startswith('/volunteer-atd'):
    attendance_summary = getVolunteerAttendanceData(usermessage)
    if isinstance(attendance_summary,list):
      response_file_path = datashare.getCSVFile(attendance_summary,usermessage,username,'V_')
      return response_file_path
    else:
      return attendance_summary
