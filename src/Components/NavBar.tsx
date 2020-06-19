/** @format */

import React from "react";
import { GridRow } from "./GridRow";
import { UserProfile } from "./UserProfile";
import { navBarMobileThreshold } from "../Other/Constants";
import { getSVGPath } from "../Other/Utils";
import { Link } from "react-router-dom";
import { getString } from "../Language/LanguageHandler";

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
    href: "/",
  },
  {
    name: getString("commands"),
    external: false,
    href: "/commands",
  },
  {
    name: getString("faq"),
    external: false,
    href: "/faq",
  },
  {
    name: getString("admin"),
    external: false,
    admin_only: true,
    href: "/admin",
  },
];

type DesktopNavBarProps = {};

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
            <img src={getSVGPath("icon")} draggable={false} />
            <span className="gear">GEAR</span>
            <span className="bot">BOT</span>
          </Link>
          {navBarTabs.map((tab: NavBarTab, index: number) => {
            return (
              <Link to={tab.href} key={"tab-" + index} className="navbar-tab">
                <span>{tab.name}</span>
              </Link>
            );
          })}
          <UserProfile
            withDropdown={true}
            user={{
              username: "JohnyTheCarrot",
              discriminator: "0001",
              id: "132819036282159104",
              avatar: "cd1027e339b0e0a1001fd84cf7e3be13",
            }}
          />
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
            <img src={getSVGPath("icon")} />
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
          <DesktopNavBar />
        ) : (
          <MobileNavBar />
        )}
      </div>
    );
  }
}
