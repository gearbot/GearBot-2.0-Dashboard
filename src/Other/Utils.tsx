/** @format */

import { DiscordUser, DiscordGuild } from "./Types";

export function abbreviateGuildName(guild: DiscordGuild) {
  return guild.name.replace(/[^A-Z]/g, "");
}

export function capStringLength(str: string, length: number) {
  if (str.length > length) return str.slice(0, length) + "...";
  else return str;
}

export function getGuildIcon(
  guild: DiscordGuild,
  size?: 16 | 32 | 64 | 128 | 512
) {
  if (!guild.icon) return undefined;
  return `https://cdn.discordapp.com/icons/${guild.id}/${
    guild.icon
  }.webp?size=${size ?? 128}`;
}

export function getProfilePicture(user: DiscordUser): string {
  if (user.avatar !== null)
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
  else {
    const default_avatar = parseInt(user.discriminator) % 5;
    return `https://cdn.discordapp.com/embed/avatars/${default_avatar}.png`;
  }
}

export function getSVGPath(name: string): string {
  return `/SVGs/${name}.svg`;
}
