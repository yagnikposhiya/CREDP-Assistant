"""
Author: Yagnik Poshiya
GitHub: @yagnikposhiya
Charusat Rural Education Development Program
Charotar University of Science and Technology
"""

import pandas as pd
from tabulate import tabulate

def getExcelFile(json_data):
  file = 'sample_data.csv'
  dataframe = pd.DataFrame(json_data)
  dataframe.to_csv(file, index=False)
  return str('Attendance sheet is generated')

def getDataFrame(json_data):
  df = pd.DataFrame(json_data)
  df = df.to_string(index=False)
  return df