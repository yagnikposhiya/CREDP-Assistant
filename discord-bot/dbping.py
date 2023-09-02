"""
Author: Yagnik Poshiya
GitHub: @yagnikposhiya
Charusat Rural Education Development Program
Charotar University of Science and Technology
"""

import pytz
import requests
import apscheduler
from apscheduler.schedulers.blocking import BlockingScheduler

def pingURL():
  url_to_ping = 'https://credp-backend.onrender.com/'
  try:
    response = requests.get(url_to_ping)
    if response.status_code == 200:
      print("Successfully pinged {utp}".format(utp=url_to_ping))
    else:
      print("Failed to ping {utp}. Status code: {rsc}".format(utp=url_to_ping,rsc=response.status_code))
  except Exception as e:
    print("An error occurred while pinging {utp}: {exception}".format(utp=url_to_ping,exception=e))

def dbPing():
  local_timezone = pytz.timezone('Asia/Kolkata')
  scheduler = BlockingScheduler(timezone=local_timezone)
  scheduler.add_job(pingURL,"interval",minutes=3)
  scheduler.start()
    