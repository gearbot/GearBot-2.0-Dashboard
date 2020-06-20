# Permissions introduction
At it's core, GearBot uses a very basic permission system that determines who is able to run what commands.


|Nr  |      Name       |                    Requirement                    |
|----|-----------------|---------------------------------------------------|
|  0 | Public          | Everyone                                          |
|  1 | Trusted         | People with a trusted role or mod+                |
|  2 | Mod             | People with ban permissions or admin+             |
|  3 | Admin           | People with administrator perms or an admin role  |
|  4 | Specific people | People you added to the whitelist for a command   |
|  5 | Server owner    | The person who owns the server                    |
|  6 | Disabled        | Perm level nobody can get, used to disable stuff  |
> **NOTE**: Bot owner commands to manage and update the bot fall outside of this permissions system and are handled separately, similarly bot ownership is not part of these permissions checks and has no effect on that. 

For example: all commands in the basic cog have a default permission requirement of 0, allowing anyone to run them. This can be changed with an override (see [Reconfiguring command requirements](../command_requirements) for details later on) to only allow mods, or even nobody to run these commands.

# Default detections
Anyone with a role that has ``BAN MEMBERS`` is considered to be at level 2, ``ADMINISTRATOR`` grants level 3.

# Reconfiguring command requirements

**Note:** While this is possible it is not required to do so on all servers, if the defaults work for you, there is no need to add any overrides.

To determine the permission level required to run a command it looks in the following order, and uses the first one it finds:

1. a command override for that specific command
2. a command override for the parent command (recursive) if this is a subcommand (so if you add an override to the `role` command, but not to the `role add` subcommand, the top first will apply)
3. a cog override for the cog this command belongs to
4. default permission requirement for the command (most do not have one, only a few have this)
5. default permission requirement for the cog this command belongs to

## About cogs

Commands are grouped into cogs, groups of commands if you will. If you look at the [command list](../../commands), the commands are listed there, together with their default command level.

# Cog overrides

If you want to add a cog override:

```
!configure cog_overrides add <cog> <level>
```

**Note:** Cog names are case sensitive!

To remove it later:

```
!configure cog_overrides remove <cog> <level>
```

You can also get a list of all configured cog overrides:

```
!configure cog_overrides
```

# Command overrides

If cog overrides are to big for what you want to adjust, you can also adjust it for individual commands (or subcommands if you wrap it in quotation marks):

```
!configure command_overrides add <command> <level>
```

You can also remove them again:

```
!configure command_overrides remove <command> <level>
```

And view the list of what you have configured:

```
!configure command_overrides
```
