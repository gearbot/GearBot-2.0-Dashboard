/** @format */

import { DiscordUser, DiscordGuild, Theme } from "./Types";
import React, { ReactElement } from "react";
import { defaultTheme } from "./Constants";

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

// TODO: make more readable
export function formatWithElements(
  elements: { [key: string]: ReactElement },
  str: string
) {
  let to_return: ReactElement[] = [];
  let matches = str.matchAll(/{([^}]+)}/g);
  let stringPieces = str
    .split(/({(?:[^}]+)})/g)
    .map((s) => s.replace(/({(?:[^}]+)})/g, ""));
  if (stringPieces[0] === "") delete stringPieces[0];
  let match_array: string[] = [];
  let match = matches.next();
  let done = false;
  while (!done) {
    done = match.done!!;
    if (match.value) match_array.push(match.value[1]);
    match = matches.next();
  }
  if (match_array.length === 0) return [<span>{str}</span>];
  let other_placeholders = { ...elements };
  let match_index = 0;
  stringPieces.forEach((piece, index) => {
    if (piece !== "") {
      to_return.push(
        <span className="text">
          {/**formatWithElements(other_placeholders, stringPieces[index])*/}
          {stringPieces[index]}
        </span>
      );
      return;
    }
    let match = match_array[match_index];
    to_return.push(elements[match]);
    delete other_placeholders[match];
    match_index++;
  });
  return to_return;
}

export function getProfilePicture(user: DiscordUser): string {
  if (user.avatar !== null)
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
  else {
    const default_avatar = parseInt(user.discriminator) % 5;
    return `https://cdn.discordapp.com/embed/avatars/${default_avatar}.png`;
  }
}

export function setCurrentTheme(theme: Theme) {
  localStorage.setItem("theme", theme);
}

export function getCurrentTheme(): Theme {
  let themeFromStorage = localStorage.getItem("theme") as Theme;
  if (themeFromStorage === null) {
    themeFromStorage = defaultTheme;
  }
  return themeFromStorage;
}
/**
export function getThemedSVGPath(theme: Theme, name: string): string {
  return getSVGPath(`themed/${theme}/${name}`);
}

export function getSVGPath(name: string): string {
  return `/SVGs/${name}.svg`;
}
*/
