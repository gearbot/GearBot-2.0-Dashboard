# Setting up logging
GearBot can help you keep track of what people are doing on the server and when bad actors are trying to cover their tracks.
Altough it is recommended to use 2 logging channels (one for everything, one with only critical logs that mods should be aware of like users being censored), you can as many channels as fits your needs.

Logs can be added to a channel with ``!configure logging add <channel> <key>`` and removed with ``!configure logging remove <channel> <key>``. Alternatively you can use ``everything`` instead of a key to add/remove everything.
A list of what is being logged where can be acquired by running``!configure logging`` without further arguments.

# Setting up a general bot log channel
To setup a general botlog channel, make a new channel and make sure GearBot has the following permissions in that channel:

 - READ MESSAGES
 - SEND MESSAGES
 - USE EXTERNAL EMOJI
 - ATTACH FILES
 - EMBED LINKS
 

Next run the ``!configure logging add <channel> everything``, where you replace ``<channel>`` with a mention of the channel, it's name (wrapped in "") or ID.
This will make it log everything in that channel.
 
> **Note: If you want edit and delete logs as well please run the ``!configure features enable EDIT_LOGS`` command as well to enable tracking and logging of message changes.**
 
 # Detailed setup
 You can also add keys one by one to and from channels, all the category keys are:
 - CHANNEL_CHANGES
 - CENSORED_MESSAGES
 - MESSAGE_FLAGS
 - FUTURE_LOGS
 - MESSAGE_LOGS
 - MOD_ACTIONS
 - MISC
 - NAME_CHANGES
 - RAID_LOGS
 - ROLE_CHANGES
 - SPAM_VIOLATION
 - TRAVEL_LOGS
 - VOICE_CHANGES
 - VOICE_CHANGES_DETAILED

 > `FUTURE_LOGS` is a special one, this one doesn't log anything, it is merely a placeholder. When new logging types are added, having this one configured means they will automatically be added and enabled.


# Ignoring bots or channel changes
Some bots are updating their messages very regularly (like music bots editing a progress or now playing message), to prevent these from downing out the rest of the logs you can ignore edits from these bots:
```
!configure ignored_users add <user>
```
> You can use ``!configure ignored_users list`` to get a list of currently ignored users, ``!configure ignored_users remove <user>`` to stop ignoring a user for edit logs.