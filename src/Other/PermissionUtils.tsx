import { getString } from "../Language/LanguageHandler";
import { DiscordChannel, DiscordMember, GuildEntry } from "./Types";

export enum PERMISSION {
  CREATE_INSTANT_INVITE = 0x00000001,
  MANAGE_CHANNELS = 0x00000010,
  ADD_REACTIONS = 0x00000040,
  STREAM = 0x00000200,
  VIEW_CHANNEL = 0x00000400,
  SEND_MESSAGES = 0x00000800,
  SEND_TTS_MESSAGES = 0x00001000,
  MANAGE_MESSAGES = 0x00002000,
  EMBED_LINKS = 0x00004000,
  ATTACH_FILES = 0x00008000,
  READ_MESSAGE_HISTORY = 0x00010000,
  MENTION_EVERYONE = 0x00020000,
  USE_EXTERNAL_EMOJIS = 0x00040000,
  CONNECT = 0x00100000,
  SPEAK = 0x00200000,
  MUTE_MEMBERS = 0x00400000,
  DEAFEN_MEMBERS = 0x00800000,
  MOVE_MEMBERS = 0x01000000,
  USE_VAD = 0x02000000,
  MANAGE_ROLES = 0x10000000,
  MANAGE_WEBHOOKS = 0x20000000
}

// for testing purposes
export function allPermissions() {
  let value = 0;
  for (let perm in PERMISSION) {
    // +x casts x to a number
    if (!isNaN(+perm))
      value |= +perm;
  }
  return value;
}

export const REQUIRED_PERMS: PERMISSION[] = [
  PERMISSION.VIEW_CHANNEL,
  PERMISSION.SEND_MESSAGES,
  PERMISSION.EMBED_LINKS,
  PERMISSION.READ_MESSAGE_HISTORY,
  PERMISSION.ADD_REACTIONS,
  PERMISSION.USE_EXTERNAL_EMOJIS
]

export const PERMS_HELP: {
  explanation: string;
  required_permission: PERMISSION;
}[] = [
  {
    explanation: "I would like to use the slowmode command.",
    required_permission: PERMISSION.MANAGE_CHANNELS
  },
  {
    explanation: "I would like to use the censoring system and/or the prune command.",
    required_permission: PERMISSION.MANAGE_MESSAGES
  },
  {
    explanation: "I would like GearBot to be able to attach files so that long replies or channel archives can be sent.",
    required_permission: PERMISSION.ATTACH_FILES
  }
]

export function getPermissionName(perm: PERMISSION) {
  return getString(PERMISSION[perm])
}

export enum PERMISSION_TYPE {
  TEXT,
  VOICE,
  TEXT_AND_VOICE,
  GUILD
}

export const PERMISSIONS: { [key in PERMISSION]: PERMISSION_TYPE } = {
  [PERMISSION.CREATE_INSTANT_INVITE]: PERMISSION_TYPE.TEXT_AND_VOICE,
  [PERMISSION.MANAGE_CHANNELS]: PERMISSION_TYPE.TEXT_AND_VOICE,
  [PERMISSION.ADD_REACTIONS]: PERMISSION_TYPE.TEXT,
  [PERMISSION.STREAM]: PERMISSION_TYPE.VOICE,
  [PERMISSION.VIEW_CHANNEL]: PERMISSION_TYPE.TEXT_AND_VOICE,
  [PERMISSION.SEND_MESSAGES]: PERMISSION_TYPE.TEXT,
  [PERMISSION.SEND_TTS_MESSAGES]: PERMISSION_TYPE.TEXT,
  [PERMISSION.MANAGE_MESSAGES]: PERMISSION_TYPE.TEXT,
  [PERMISSION.EMBED_LINKS]: PERMISSION_TYPE.TEXT,
  [PERMISSION.ATTACH_FILES]: PERMISSION_TYPE.TEXT,
  [PERMISSION.READ_MESSAGE_HISTORY]: PERMISSION_TYPE.TEXT,
  [PERMISSION.MENTION_EVERYONE]: PERMISSION_TYPE.TEXT,
  [PERMISSION.USE_EXTERNAL_EMOJIS]: PERMISSION_TYPE.TEXT,
  [PERMISSION.CONNECT]: PERMISSION_TYPE.VOICE,
  [PERMISSION.SPEAK]: PERMISSION_TYPE.VOICE,
  [PERMISSION.MUTE_MEMBERS]: PERMISSION_TYPE.VOICE,
  [PERMISSION.DEAFEN_MEMBERS]: PERMISSION_TYPE.VOICE,
  [PERMISSION.MOVE_MEMBERS]: PERMISSION_TYPE.VOICE,
  [PERMISSION.USE_VAD]: PERMISSION_TYPE.VOICE,
  [PERMISSION.MANAGE_ROLES]: PERMISSION_TYPE.TEXT_AND_VOICE,
  [PERMISSION.MANAGE_WEBHOOKS]: PERMISSION_TYPE.TEXT
}

export function hasPermissionSimple(value: number, perm: PERMISSION) {
  return (value & perm) === perm;
}

export function hasPermission(guild: GuildEntry, channel: DiscordChannel, member: DiscordMember, perm: PERMISSION) {
  console.log(guild.currentRoles);
  return undefined;
}