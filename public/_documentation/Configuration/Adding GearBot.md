# Adding GearBot

First things first: let's add GearBot to the server, you can do so by clicking [HERE](https://discord.com/oauth2/authorize?client_id=349977940198555660&scope=bot&permissions=1476783350).

GearBot asks for permissions, some are required but most can be disabled if you do not want to use the features that require them.

| Permission | Optional? | Reason |
| ---------- | --------- | ------ |
| Manage server | Yes | Allows editing the server verification level with the ``!verification`` command  |
| Manage roles | Yes | Allows GearBot to add/remove roles from server members, this is used in the role commands as well as when (un)muting people |
| Manage channels | Yes | Allows a channel's slowmode setting to be updated through the ``!slowmode`` command |
| Kick members | Yes | Allows kicking users through the kick commands |
| Ban members | Yes | Allows banning and unbanning members through the ban commands |
| Manage nicknames | Yes | Allows changing member usernames through the ``!nickname`` commands | 
| Manage Emoji | Yes | Allows managing the guild emoji through the ``!emoji`` commands (not required for list) |
| View Audit log | Yes | Allows GearBot to detect manual kicks and bans (done by a user directly) and store these as infractions as well |
| Read messages | No | Makes sure GearBot can read messages in channels (unless blocked by a channel override) |
| Send messages | No | Makes sure GearBot can send messages in channels (unless blocked by a channel override) |
| Manage messages | Yes | Allows GearBot to delete commands when censoring is enabled and when the ``!prune`` command is used |
| Embed Links | No | Makes sure GearBot can send embeds |
| Attach Files | Yes | Makes sure GearBot can attach files for long replies (like channel archives) (unless blocked by a channel override) |
| Read Message History | No | Makes sure GearBot can see older messages as well |
| Add Reactions | No | Makes sure GearBot can add reaction for paged output (unless blocked by a channel override) |
| Use External Emoji | No | Makes sure GearBot can use it's own emoji for command output (unless blocked by a channel override) |

# Moving the GearBot role
By default Discord will have put the newly made GearBot role at the bottom of the role list. If GearBot should be able to act on users please move that role up or give it another higher role, so that it's highest role is above the users top role.