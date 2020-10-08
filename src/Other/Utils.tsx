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

export function formatWithElements(
  elements: { [key: string]: ReactElement },
  str: string
) {
  const matches = str.matchAll(/{([^}]+)}/g);
  const splitString = str.split(/({(?:[^}]+)})/g);
  const splitStringFiltered = splitString[0]
    ? splitString
    : splitString.slice(1);
  const stringPieces = splitStringFiltered.map((s) =>
    s.replace(/({(?:[^}]+)})/g, "")
  );
  const matchArray = Array.from(
    matches,
    ([, /* skip the first element */ group]) => group
  );
  if (matchArray.length === 0) return [<span>{str}</span>];
  const matchIter = matchArray[Symbol.iterator]();
  return stringPieces.map((piece, index) => {
    if (piece !== "")
      return (
        <span className="text" key={index}>
          {stringPieces[index]}
        </span>
      );
    const match = matchIter.next().value;
    return <React.Fragment key={index}>{elements[match]}</React.Fragment>;
  });
}

// If gif is true, this will return a gif link if and only if the avatar also supports being a gif in the first place.
// Else, it will return a png.
export function getProfilePicture(
  user: DiscordUser,
  gif: boolean = false,
  size: 16 | 32 | 64 | 128 = 128
): string {
  let extension = "png";
  if (gif && user.avatar.substring(0, 2) === "a_") {
    extension = "gif";
  }
  if (user.avatar !== null)
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${extension}?size=${size}`;
  else {
    const default_avatar = parseInt(user.discriminator) % 5;
    return `https://cdn.discordapp.com/embed/avatars/${default_avatar}.${extension}?size=${size}`;
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
