/** @format */

import { GearRoute, FooterLink } from "./Types";
import Home from "../Pages/Home";
import Commands from "../Pages/Commands";
import Development from "../Pages/Development";
import { Documentation } from "../Pages/Documentation";
import { getString } from "../Language/LanguageHandler";

export const navBarMobileThreshold = 1100;

export const botInvite =
  "https://discordapp.com/oauth2/authorize?client_id=349977940198555660&scope=bot&permissions=1476783350";

export const supportServerInvite = "https://discord.gg/EKautd5";

export const permissionLevels: string[] = [
  "Public",
  "Trusted",
  "Mod",
  "Admin",
  "Specific People",
  "Server Owner",
  "Disabled",
];

export const routes: GearRoute[] = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/docs/:section/:subsection",
    exact: true,
    component: Documentation,
  },
  {
    path: "/docs/:section",
    exact: true,
    component: Documentation,
  },
  {
    path: "/docs",
    exact: true,
    component: Documentation,
  },
  {
    path: "/commands",
    exact: true,
    component: Commands,
  },
  {
    path: "/__development",
    exact: true,
    component: Development,
  },
];

export const footerLinks: FooterLink[] = [
  {
    external: false,
    href: "/",
    name: getString("home"),
  },
  {
    external: true,
    href: botInvite,
    name: getString("add_gearbot"),
  },
  {
    external: false,
    href: "/commands",
    name: getString("commands"),
  },
  {
    external: false,
    href: "/docs",
    name: getString("documentation"),
  },
];
