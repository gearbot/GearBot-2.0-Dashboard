/** @format */

import React from "react";
import { GridRow } from "./GridRow";
import { UserProfile } from "./UserProfile";
import {
  navBarMobileThreshold,
  supportServerInvite,
  navBarTabs,
} from "../Other/Constants";
import { Link } from "react-router-dom";
import { getString } from "../Language/LanguageHandler";
import { DiscordUser, NavBarTab } from "../Other/Types";

// SVGs
import { ReactComponent as GearBot } from "../SVG/gearbot.svg";
import { ReactComponent as DiscordLogo } from "../SVG/Discord-Logo.svg";
import { ReactComponent as Cross } from "../SVG/cross.svg";

type DesktopNavBarProps = {
  user?: DiscordUser;
  scroller: HTMLDivElement;
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
            <GearBot
              className="svg_logo"
              width="36"
              height="36"
              style={{ marginRight: 2 }}
            />
            <span className="gear">GEAR</span>
            <span className="bot">BOT</span>
          </Link>
          {navBarTabs.map((tab: NavBarTab, index: number) => {
            return !tab.external ? (
              <Link
                to={tab.href}
                key={"tab-" + index}
                className="navbar-tab"
                onClick={() => (this.props.scroller.scrollTop = 0)}
              >
                <span>{tab.name}</span>
              </Link>
            ) : (
              <a
                key={index}
                href={tab.href}
                target="_blank"
                rel="noopener noreferrer"
                className="navbar-tab"
                onClick={() => (this.props.scroller.scrollTop = 0)}
              >
                <span>{tab.name}</span>
              </a>
            );
          })}
          {this.props.user ? (
            <UserProfile withDropdown={true} user={this.props.user} />
          ) : (
            <div className="login-with-discord">
              <a
                href={supportServerInvite}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="login-content">
                  <DiscordLogo className="svg_basic" width={32} />
                  <span className="text">
                    {getString("join_support_server")}
                  </span>
                </div>
              </a>
            </div>
          )}
        </GridRow>
      </div>
    );
  }
}

type MobileNavBarProps = {
  scroller: HTMLDivElement;
};

type MobileNavBarState = {
  burgerOpened: boolean;
};

export class MobileNavBar extends React.Component<
  MobileNavBarProps,
  MobileNavBarState
> {
  constructor(props: MobileNavBarProps) {
    super(props);
    this.state = {
      burgerOpened: false,
    };
  }

  render() {
    return (
      <>
        {this.state.burgerOpened && (
          <>
            <div
              className="burger-bg"
              onClick={() => this.setState({ burgerOpened: false })}
            />
            <div className="burger-menu">
              <div
                className="hamburger"
                onClick={() => this.setState({ burgerOpened: false })}
              >
                <Cross className="svg_cross" width={45} height={45} />
              </div>
              <div className="burger-content">
                <Link
                  onClick={() => this.setState({ burgerOpened: false })}
                  to="/"
                  key="tab-home"
                  className="navbar-tab"
                >
                  <span>{getString("home")}</span>
                </Link>
                {navBarTabs.map((tab: NavBarTab, index: number) => {
                  return !tab.external ? (
                    <Link
                      onClick={() => {
                        this.setState({ burgerOpened: false });
                        this.props.scroller.scrollTop = 0;
                      }}
                      to={tab.href}
                      key={"tab-" + index}
                      className="navbar-tab"
                    >
                      <span>{tab.name}</span>
                    </Link>
                  ) : (
                    <a
                      onClick={() => {
                        this.setState({ burgerOpened: false });
                        this.props.scroller.scrollTop = 0;
                      }}
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
                <a href={supportServerInvite} className="navbar-tab">
                  <span>{getString("join_support_server")}</span>
                </a>
              </div>
            </div>
          </>
        )}
        <div className="hamburger">
          <div onClick={() => this.setState({ burgerOpened: true })}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="content">
          <div className="header-logo">
            <GearBot
              className="svg_logo"
              width="36"
              height="36"
              style={{ marginRight: 2 }}
            />
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
  scroller: HTMLDivElement;
};

type NavBarState = {};

export default class NavBar extends React.Component<NavBarProps, NavBarState> {
  constructor(props: NavBarProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page-header">
        {this.props.pageWidth > navBarMobileThreshold ? (
          <DesktopNavBar
            user={this.props.user}
            scroller={this.props.scroller}
          />
        ) : (
          <MobileNavBar scroller={this.props.scroller} />
        )}
      </div>
    );
  }
}
