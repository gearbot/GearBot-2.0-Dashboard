# Censoring

GearBot currently supports 3 types of censoring:

- invite censoring
- text censoring
- link domain censoring (censoring when a link to a domain that is not allowed)

Moderators and admins will never be censored by GearBot. If you feel there is a need to censor your staff, you might want to rethink who you picked as staff. 

## Initial setup

Make sure the feature is enabled if you want it GearBot to censor messages:

```
!configure features enable CENSOR_MESSAGES
```

## Invite censoring

GearBot works with server based whitelisting of invites. This means that instead of allowing a specific invite, you allow invites to a specific server, and all invites to that server will be allowed.
If no servers are on the allowed servers list, then all invites will be allowed. 

Invite censoring does not kick in until there are servers on the whitelist. If you do not want any external invites to be posted you can just add your server to the whitelist and no others.

If you do not want any invites to other servers to be send, only add the id of your own server to the list.

> Since GearBot cannot know if a server id is a valid serverid without being on that server, it considers all ids valid.

To add a server to the list:

```
!configure allowed_invites add <serverid>
```

To no longer allow invites to a specific server:

```
!configure allowed_invites remove <serverid>
```

And to view the entire list:

```
!configure allowed_invites
```

## Text censoring

For censoring text there are 2 options:
- token based (if the text is found anywhere in the message)
- word based (if the text is found as standalone word)

Both are case insensitive.
> For tokens use ``censor_list`` instead of` `censor_word_list``

To add something to the to censored words list:

```
!configure word_censor_list add <thing>
```

To remove it from the list again:

```
!configure word_censor_list remove <thing>
```

You can always get a list of currently censored words by using
```
!configure word_censor_list
```