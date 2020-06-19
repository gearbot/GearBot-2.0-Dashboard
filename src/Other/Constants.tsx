/** @format */

import { GearRoute } from "./Types";
import Home from "../Pages/Home";
import Commands from "../Pages/Commands";

export const navBarMobileThreshold = 1100;

export const routes: GearRoute[] = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/commands",
    exact: true,
    component: Commands,
  },
];
