# CREDP Assistant Working Mechanism
Divided whole working mechanism in the 3 stages:
### Stage 1
1. main.py: Call/Trigger the bot
### Stage 2
2. bot.py: async functionalities for schduled messages and usermessage response control
### Stage 3
3. response.py & datashare.py: usermessage response mechanism, Fully customized CSV and PDF generator, and PDF merger
### Optional Files:
4. dbping.py: optional file, used to ping database at certain time duration. So, database will not go in the sleep mode.
5. sample-script.py: optional file, used to test the any X platform for deployment of the discord-bot
