"""
Author: Yagnik Poshiya
GitHub: @yagnikposhiya
Charusat Rural Education Development Program
Charotar University of Science and Technology
"""

import bot
import dbping

if __name__=='__main__':
  dbping.dbPing()
  bot.runCREDPAssistant()