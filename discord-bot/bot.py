"""
Author: Yagnik Poshiya
GitHub: @yagnikposhiya
Charusat Rural Education Development Program
Charotar University of Science and Technology
"""
import os
import discord
import responses
# from dotenv import load_dotenv
# load_dotenv()

async def send_messages(message, usermessage, username, is_private):
  try:
    response = responses.handleResponse(username,usermessage)

    if os.path.isfile(response):
      file = discord.File(response)
      await message.channel.send(file=file)
    else:
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
    if message.author==bot.user:
      return

    username = str(message.author.display_name)
    usermessage = str(message.content)
    channel = str(message.channel)

    print('{un} said: {um} in {c}'.format(un=username,um=usermessage,c=channel))

    await send_messages(message,usermessage,username,is_private=False)

  bot.run(os.getenv('TOKEN'))