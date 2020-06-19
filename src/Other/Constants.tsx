/** @format */

import { GearRoute } from "./Types";
import Home from "../Pages/Home";
import Commands from "../Pages/Commands";
import { Documentation } from "../Pages/Documentation";

export const navBarMobileThreshold = 1100;

export const botInvite =
  "https://discordapp.com/oauth2/authorize?client_id=349977940198555660&scope=bot&permissions=1476783350";

export const supportServerInvite = "https://discord.gg/EKautd5";

export const routes: GearRoute[] = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/docs/:section/:subsection",
    exact: false,
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
    path: "/docs/commands",
    exact: true,
    component: Commands,
  },
];
