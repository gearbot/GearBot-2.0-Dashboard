/** @format */

import React from "react";

export type DiscordUser = {
  username: string;
  discriminator: string;
  id: string;
  avatar: string;
};

export type GearRoute = {
  exact: boolean;
  path: string;
  component: typeof React.Component;
};

export type FooterLink = {
  external: boolean;
  href: string;
  name: string;
};
