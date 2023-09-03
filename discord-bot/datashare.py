"""
Author: Yagnik Poshiya
GitHub: @yagnikposhiya
Charusat Rural Education Development Program
Charotar University of Science and Technology
"""

import csv
import pytz
import datetime
import pandas as pd
from tabulate import tabulate

def getCSVFile(json_data,username,prefix):
  col_name_dict = {'std':'Standard','total':'Total','present':'Present','absent':'Absent','name':'Name','student_id':'Student-ID',
                  'student_name':'Student Name', 'department':'Department','institute':'Institute','in_time':'In-Time','out_time':'Out-Time'}
  
  base_path = 'attendance-sheet/'
  username = ''.join(username.split())
  local_timezone = pytz.timezone('Asia/Kolkata')
  current_time = datetime.datetime.now(local_timezone)
  format_time = current_time.strftime('%d-%m-%Y_%I%M%p')
  file = prefix + username + '_' + format_time + '.csv'
  file_path = base_path + file
  
  dataframe = pd.DataFrame(json_data)
  column_names = dataframe.columns.tolist()
  new_column_names = []
  
  for col in column_names:
    if col in col_name_dict.keys():
      new_column_names.append(col_name_dict[col])

  dataframe.columns = new_column_names

  if 'Present' in dataframe.columns:
    dataframe['Present'] = dataframe['Present'].replace({0:'No',1:'Yes'})
    
  dataframe.to_csv(file_path,index=False)
  return str('Attendance sheet is generated')

def getDataFrame(json_data):
  df = pd.DataFrame(json_data)
  df = df.to_string(index=False)
  return df
  