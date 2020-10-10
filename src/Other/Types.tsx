/** @format */

import React from "react";

export type DiscordUser = {
  username: string;
  discriminator: string;
  id: string;
  avatar: string;
};

export type Theme = "dark" | "light";

export interface GearTeamMember extends DiscordUser {
  socials: {
    github?: string;
    twitter?: string;
    personalSite?: string;
  };
}

export type DiscordGuild = {
  name: string;
  owner: DiscordUser;
  id: string;
  icon?: string;
};

export type NavBarTab = {
  name: string;
  external?: boolean;
  admin_only?: boolean;
  href: string;
};

export type GearRawRoute = {
  exact: boolean;
  path: string;
  component_file_name: string;
};

export type GearPromisedRoute = {
  exact: boolean;
  path: string;
  component: () => Promise<{
    default: React.ComponentType<any>;
  }>;
};

export type GearResolvedRoute = {
  exact: boolean;
  path: string;
  Component: any;
};

export type FooterLink = {
  external: boolean;
  href: string;
  name: string;
};

export type Command = {
  aliases: string[];
  commandlevel: number;
  description: string;
  example: string;
  subcommands: { [key: string]: Command };
};

export type LogType = "BAN" | "KICK";

export type LogEntry = {
  logType: LogType;
  author: DiscordUser;
  target: DiscordUser;
  duration?: number;
  reason: string;
};
