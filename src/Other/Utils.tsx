/** @format */

import { DiscordUser } from "./Types";

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
