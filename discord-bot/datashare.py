"""
Author: Yagnik Poshiya
GitHub: @yagnikposhiya
Charusat Rural Education Development Program
Charotar University of Science and Technology
"""

import csv
import pytz
import datetime
import reportlab
import pandas as pd
from tabulate import tabulate
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import letter, landscape
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle


def CSVToPDF(file_path_csv,username,prefix):
  base_path = 'attendance-sheet-pdf/'
  username_formatted = ''.join(username.split())
  local_timezone = pytz.timezone('Asia/Kolkata')
  current_time = datetime.datetime.now(local_timezone)
  format_time = current_time.strftime('%d-%m-%Y_%I%M%p')
  file = prefix + username_formatted + '_' + format_time + '.pdf'
  file_path_pdf = base_path + file

  table_data = []
  
  pdfmetrics.registerFont(TTFont('TimesNewRoman', 'fonts/TimesNewRoman/times-new-roman.ttf'))

  styles = getSampleStyleSheet()
  custom_font_style = styles['Normal'].clone('CustomFontStyle')
  custom_font_style.fontName = 'TimesNewRoman'
  

  with open(file_path_csv,'r') as f:
    csv_reader = csv.reader(f)
    for row in csv_reader:
      table_data.append(row)

  pdf = SimpleDocTemplate(file_path_pdf, pagesize=landscape(letter))
  table = Table(table_data)
  table.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), (0.7, 0.7, 0.7))]))
  table.setStyle(TableStyle([('FONTSIZE', (0, 0), (-1, -1), 12)]))
  table.setStyle(TableStyle([('FONTNAME', (0, 0), (-1, -1), 'TimesNewRoman')]))
  pdf.build([table])

  return str('Attendance sheet (in pdf) is generated')


def getCSVFile(json_data,usermessage,username,prefix):
  col_name_dict = {'std':'Standard','total':'Total','present':'Present','absent':'Absent','name':'Name','student_id':'Student-ID',
                  'student_name':'Student Name', 'department':'Department','institute':'Institute','in_time':'In-Time','out_time':'Out-Time'}
  
  base_path = 'attendance-sheet-csv/'
  username_formatted = ''.join(username.split())
  local_timezone = pytz.timezone('Asia/Kolkata')
  current_time = datetime.datetime.now(local_timezone)
  format_time = current_time.strftime('%d-%m-%Y_%I%M%p')
  file = prefix + username_formatted + '_' + format_time + '.csv'
  file_path = base_path + file
  
  dataframe = pd.DataFrame(json_data)
  column_names = dataframe.columns.tolist()
  new_column_names = []
  
  for col in column_names:
    if col in col_name_dict.keys():
      new_column_names.append(col_name_dict[col])

  dataframe.columns = new_column_names

  if usermessage.startswith('/volunteer-atd'):
    dataframe['Standard'].fillna(0, inplace=True)
    dataframe['Standard'] = dataframe['Standard'].astype(int)
    dataframe['Department'] = dataframe['Department'].str.upper()
    dataframe['Institute'] = dataframe['Institute'].str.upper()
    dataframe['Student-ID'] = dataframe['Student-ID'].str.upper()
  
  if 'Present' in dataframe.columns:
    if usermessage.startswith('/student-atd ') or usermessage.startswith('/volunteer-atd'):
      dataframe['Present'] = dataframe['Present'].replace({0:'No',1:'Yes'})

  dataframe.to_csv(file_path,index=False)
  _ = CSVToPDF(file_path,username,prefix)
  
  return str('Attendance sheet is generated')
  