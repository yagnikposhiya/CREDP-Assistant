"""
Author: Yagnik Poshiya
GitHub: @yagnikposhiya
Charusat Rural Education Development Program (CREDP),
Charotar University of Science and Technology.
"""

import os
import discord
import responses
from dotenv import load_dotenv
load_dotenv()

async def send_messages(message, usermessage, username, is_private):
    try:
        response = responses.handle_response(username,usermessage)
        await message.author.send(response) if is_private else await message.channel.send(response)

    except Exception as exception:
        print(exception)

def runCREDPAssistant():

    intents = discord.Intents.default()
    intents.message_content = True
    bot = discord.Client(intents=intents)

    @bot.event
    async def on_ready():
        print('{} is running'.format(bot.user))

    @bot.event
    async def on_message(message):
        if message.author == bot.user:
            return
        
        username = str(message.author.display_name)
        usermessage = str(message.content)
        channel = str(message.channel)

        print('{username} said: {usermessage} in {channel}'.format(username=username,usermessage=usermessage,channel=channel))

        await send_messages(message, usermessage, username, is_private=False)

    bot.run(os.getenv('TOKEN'))