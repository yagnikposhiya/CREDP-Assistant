"""
Author: Yagnik Poshiya
GitHub: @yagnikposhiya
Charusat Rural Education Development Program
Charotar University of Science and Technology
"""
import os
import pytz
import discord
import asyncio
import datetime
import responses
from discord.ext import commands, tasks
# from dotenv import load_dotenv
# load_dotenv()

intents = discord.Intents.default()
intents.message_content = True

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

@tasks.loop(seconds=10)
async def send_scheduled_messages():
  channel = bot.get_channel(1142402656351039538)
  local_timezone = pytz.timezone('Asia/Kolkata')
  now = datetime.datetime.now(local_timezone)
  if now.hour==15 and now.minute==43:
    await channel.send('Good evening!')

class CREDPAssistant(commands.Bot):
  async def setup_hook(self):
    self.loop.create_task(send_scheduled_messages())
    send_scheduled_messages.start()

bot = CREDPAssistant(command_prefix='!',intents=intents)

def runCREDPAssistant():
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