"""
Author: Yagnik Poshiya
GitHub: @yagnikposhiya
Charusat Rural Education Development Program
Charotar University of Science and Technology
"""

import bot
import dbping
import multiprocessing

if __name__=='__main__':
  database_ping_process = multiprocessing.Process(target=dbping.dbPing())
  discord_bot_process = multiprocessing.Process(target=bot.runCREDPAssistant())

  database_ping_process.start()
  discord_bot_process.start()
  
  # dbping.dbPing()
  # bot.runCREDPAssistant()