# Basic utilities
In addition to the 'classical' moderation commands like mute, kick ban and assorted commands GearBot also has a lot of basic utilities that can make the job of a moderator a lot easier:
### Quoting
The ``!quote`` command allows you to make the bot replicate a message someone send elsewhere in the server from a jump link
```
!quote https://canary.discordapp.com/channels/365498559174410241/365498559723732993/724560809174499398
```

This can be useful to replicate a message in another channel for context or to easier discuss it with other staff. It can also just be used to make the bot repeat something someone said earlier to answer a question

### Custom commands
Answering the same question over and over? Read more about how to make custom commands [HERE](../Configuration/Custom%20commands.md) that can make that a lot easier.

### Archiving
When edit logs are enabled you can use the archive commands to get a text file of an earlier conversation or recent messages of a specific person, including deleted ones. This can be useful to see who said what exactly when even after the messages have been deleted.
How to use the command for channels:
```!archive channel <channel> <amount>```
When archiving a user's messages:
```!archive user <user> <amount>```
In both cases the amount is optional (defaults to 100 when omitted), for archiving a channel you can also omit the channel and it will default to doing 100 messages in the current channel.

### Nickname commands
Quickly changing someone's (offensive) nickname can be a hassle when on mobile, with the nickname commands you can quickly fix that.
To add or update a nickname for someone:
```
!nickname set <user> <name>
```

To remove their nickname:
```
 !nickname remove <user>
 ```