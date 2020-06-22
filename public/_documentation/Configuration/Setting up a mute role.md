# Setting up a mute role
When muting someone GearBot adds a role to them that removes their ability to send messages, react to messages and connect to voice channels. For this to work this role needs to be below GearBot's highest role. Once you made a role for this please tell GearBot what the roles is by using the following command (you can either ping the role, pass the name or it's ID):
```
!configure mute_role <role>
```
GearBot will then add the needed channel overrides to all channels in the guild.
> If the user has other roles that explicity grant a user any of those permissions in a channel the mute role will not work, regardless of if the role is above or below the mute role!

