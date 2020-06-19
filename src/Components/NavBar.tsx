/** @format */

import React from "react";
import { GridRow } from "./GridRow";
import { UserProfile } from "./UserProfile";
import {
  navBarMobileThreshold,
  botInvite,
  supportServerInvite,
} from "../Other/Constants";
import { getSVGPath } from "../Other/Utils";
import { Link } from "react-router-dom";
import { getString } from "../Language/LanguageHandler";
import { DiscordUser } from "../Other/Types";

type NavBarTab = {
  name: string;
  external?: boolean;
  admin_only?: boolean;
  href: string;
};

const navBarTabs: NavBarTab[] = [
  {
    name: getString("add_gearbot"),
    external: true,
    href: botInvite,
  },
  {
    name: getString("documentation"),
    external: false,
    href: "/docs",
  },
];

type DesktopNavBarProps = {
  user?: DiscordUser;
};

type DesktopNavBarState = {};

export class DesktopNavBar extends React.Component<
  DesktopNavBarProps,
  DesktopNavBarState
> {
  constructor(props: DesktopNavBarProps) {
    super(props);
    this.state = {
      width: 0,
    };
  }

  render() {
    return (
      <div className="content content-desktop">
        <GridRow
          gap={40}
          cell_override={"auto ".repeat(navBarTabs.length + 1) + "1fr"}
        >
          <Link to="/" className="header-logo">
            <img
              alt="gearbot logo"
              src={getSVGPath("icon")}
              draggable={false}
            />
            <span className="gear">GEAR</span>
            <span className="bot">BOT</span>
          </Link>
          {navBarTabs.map((tab: NavBarTab, index: number) => {
            return !tab.external ? (
              <Link to={tab.href} key={"tab-" + index} className="navbar-tab">
                <span>{tab.name}</span>
              </Link>
            ) : (
              <a
                key={index}
                href={tab.href}
                target="_blank"
                rel="noopener noreferrer"
                className="navbar-tab"
              >
                <span>{tab.name}</span>
              </a>
            );
          })}
          {this.props.user ? (
            <UserProfile withDropdown={true} user={this.props.user} />
          ) : (
            <a
              className="login-with-discord"
              href={supportServerInvite}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="login-content">
                <img
                  className="logo"
                  alt=""
                  src={getSVGPath("Discord-Logo-White")}
                  width={32}
                />
                <span className="text">{getString("join_support_server")}</span>
              </div>
            </a>
          )}
        </GridRow>
      </div>
    );
  }
}

type MobileNavBarProps = {};

type MobileNavBarState = {};

export class MobileNavBar extends React.Component<
  MobileNavBarProps,
  MobileNavBarState
> {
  constructor(props: MobileNavBarProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="hamburger">
          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="content">
          <div className="header-logo">
            <img src={getSVGPath("icon")} alt="gearbot logo" />
            <span className="gear">GEAR</span>
            <span className="bot">BOT</span>
          </div>
        </div>
      </>
    );
  }
}

type NavBarProps = {
  pageWidth: number;
  user?: DiscordUser;
};

type NavBarState = {};

export class NavBar extends React.Component<NavBarProps, NavBarState> {
  constructor(props: NavBarProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page-header">
        {this.props.pageWidth > navBarMobileThreshold ? (
          <DesktopNavBar user={this.props.user} />
        ) : (
          <MobileNavBar />
        )}
      </div>
    );
  }
}
