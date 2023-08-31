"""
Author: Yagnik Poshiya
GitHub: @yagnikposhiya
Charusat Rural Education Development Program (CREDP),
Charotar University of Science and Technology.
"""

import bot
import flask
from flask import Flask

app = Flask(__name__)
@app.route('/health')
def health():
    return "OK", 200

if __name__=='__main__':
    bot.runCREDPAssistant()
    app.run()
