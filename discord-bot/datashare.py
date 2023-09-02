"""
Author: Yagnik Poshiya
GitHub: @yagnikposhiya
Charusat Rural Education Development Program
Charotar University of Science and Technology
"""

import csv
import openpyxl
from openpyxl import Workbook
from openpyxl.utils.dataframe import dataframe_to_rows
import pandas as pd
from tabulate import tabulate

def getCSVFile(json_data):
  col_name_dict = {'std':'Standard','total':'Total','present':'Present','absent':'Absent','name':'Name','student_id':'Stduent-ID',
                  'student_name':'Student Name', 'department':'Department','institute':'Institute','in_time':'In-Time','out_time':'Out-Time'}
  file = 'sample_data.csv'
  dataframe = pd.DataFrame(json_data)
  column_names = dataframe.columns.tolist()
  new_column_names = []
  
  for col in column_names:
    if col in col_name_dict.keys():
      new_column_names.append(col_name_dict[col])

  dataframe.columns = new_column_names
  dataframe.to_csv(file,index=False)
  return str('Attendance sheet is generated')

def getDataFrame(json_data):
  df = pd.DataFrame(json_data)
  df = df.to_string(index=False)
  return df
  