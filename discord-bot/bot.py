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

# create intents for CREDP Assistant
intents = discord.Intents.default()
intents.message_content = True # give access to bot to read message content

# define function as main end point for responses.py & datashare.py
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

# define function for sending scheduled messages
local_timezone = pytz.timezone('Asia/Kolkata')
time_stamp_1 = datetime.time(hour=16,minute=52,tzinfo=local_timezone)
time_stamp_2 = datetime.time(hour=18,minute=1,tzinfo=local_timezone)
time_stamp_3 = datetime.time(hour=18,minute=30,tzinfo=local_timezone)
time_stamp_4 = datetime.time(hour=00,minute=30,tzinfo=local_timezone)
time_stamp_5 = datetime.time(hour=22,minute=15,tzinfo=local_timezone)
time_stamps = [time_stamp_1,time_stamp_2,time_stamp_3,time_stamp_4,time_stamp_5]
@tasks.loop(time=time_stamps)
async def send_scheduled_messages():
  channel = bot.get_channel(1142402656351039538)
  await channel.send('I have completed my nth task, I am here only!')

"""
create class for setting setup_hook for proper concurrent execution 
of scheduled_messages and other functionality of CREDP Assistant
"""
class CREDPAssistant(commands.Bot):
  async def setup_hook(self):
    self.loop.create_task(send_scheduled_messages())
    send_scheduled_messages.start()

bot = CREDPAssistant(command_prefix='!',intents=intents) # create bot object

# define function to verify that bot is working and read the message content and process it
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