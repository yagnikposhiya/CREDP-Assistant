"""
Author: Yagnik Poshiya
GitHub: @yagnikposhiya
Charusat Rural Education Development Program
Charotar University of Science and Technology
"""
import os
import yaml
import pytz
import discord
import asyncio
import datetime
import responses
import datashare
from discord.ext import commands, tasks
from dotenv import load_dotenv
load_dotenv()

# load config file
with open('config/config.yaml', 'r') as stream:
    config = yaml.safe_load(stream)

# create intents for CREDP Assistant
intents = discord.Intents.default()
intents.message_content = True # give access to bot to read message content
input_files = [] # created for self bot messages

"""
define function as main end point for responses.py & datashare.py;
for user message only
"""
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


"""
define function as main end point for responses.py & datashare.py;
for self bot message only
"""
async def self_messages(send_channel,botmessage,botname,merged_status=False):
  global input_files
  try:

    if not merged_status:
      response = responses.handleResponse(botname,botmessage)
    
      if os.path.isfile(response):
        input_files.append(response)
      else:
        await send_channel.send(response)
        
    else:
      response = datashare.PDFMerger(input_files,botname)

      if os.path.isfile(response):
        file = discord.File(response)
        input_files = [] # again intialize the input_files list as an empty list; at the end
        await send_channel.send(file=file)
      else:
        await send_channel.send('FileNotFoundError:\nThe file you requested could not be located.')

  except Exception as exception:
    print(exception)


# define function for sending scheduled messages
local_timezone = pytz.timezone(config['timezone']['local_timezone'])
time_stamp_1 = datetime.time(hour=18,minute=25,tzinfo=local_timezone)
time_stamps = [time_stamp_1]
@tasks.loop(time=time_stamps)
async def send_scheduled_messages():
  global input_files
  global local_timezone
  botmessage = ''
  input_files = [] # again assign empty list to the global variable; in the beginning
  local_merged_status = False
  channel_name = bot.get_channel(1148543686804783104) # attendance-record channel
  today_date = datetime.date.today()
  today_date_mdy = today_date.strftime('%d-%m-%Y')
  current_day = today_date.strftime('%A')
  current_time = datetime.datetime.now(local_timezone).time()
  today_date_mdy = '06-10-2023'
  botname = str(bot.user.display_name)
  botmessages = ['/volunteer-atd ','/volunteer-subtaught ','/student-atdall ', '/student-atdsum ']

  if (current_time.hour==18 and current_time.minute==25) and (current_day != config['timezone']['off_day']):
    for index,bmsg in enumerate(botmessages):
      botmessage = bmsg + today_date_mdy
      await self_messages(channel_name,botmessage,botname)

    local_merged_status = True
  
    if local_merged_status:
      await self_messages(channel_name,botmessage,botname,local_merged_status)
  
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