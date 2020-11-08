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
    website?: string | null;
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

// either 0 (role) or 1 (member)
export enum PermissionOverwriteType {
  ROLE = 0,
  MEMBER = 1
};

export type PermissionOverwrite = {
  id: string; // role or user ID
  type: PermissionOverwriteType;
  allow: string;
  deny: string;
};

export enum ChannelType {
  GUILD_TEXT = 0,
  DM = 1,
  GUILD_VOICE = 2,
  GROUP_DM = 3,
  GUILD_CATEGORY = 4,
  GUILD_NEWS = 5,
  GUILD_STORE = 6
};

export type DiscordMember = {
  id: string;
  username: string;
  discriminator: string;
  roles: DiscordRole[];
}

export type GuildEntry = {
  name: string;
  id: string;
  icon?: string | null;
  banner?: string | null;
  currentRoles?: DiscordRole[];
};

export type DiscordRoleRaw = {
  id: string;
  name: string;
  permissions: string;
  position: number;
  color: number;
  hoist: boolean;
  managed: boolean;
  mentionable: boolean;
};

export type DiscordRole = {
  id: string;
  name: string;
  permissions: bigint
  color: number;
  position: number;
};

export type Channel = {
  id: string;
  name: string;
  type: ChannelType;
  parent_id?: string | null;
  user_limit?: number;
  rate_limit_per_user?: number;
  nsfw?: boolean;
  position?: number;
  permission_overwrites?: PermissionOverwrite[];
};
