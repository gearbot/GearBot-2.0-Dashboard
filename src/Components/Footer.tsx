/** @format */

import React from "react";
import {
  navBarMobileThreshold,
  supportServerInvite,
  footerLinks,
} from "../Other/Constants";
import { getString } from "../Language/LanguageHandler";
import Grid from "./Grid";
import { FooterLink, Theme } from "../Other/Types";
import { Link } from "react-router-dom";
import { GridRow } from "./GridRow";
import { ThemeContext } from "../Other/Constants";

// SVGs
import { ReactComponent as GearBot } from "../SVG/gearbot.svg";
import { ReactComponent as DiscordLogo } from "../SVG/Discord-Logo.svg";
import { ReactComponent as Moon } from "../SVG/moon.svg";
import { ReactComponent as Sun } from "../SVG/sun.svg";

type FooterDesktopProps = {
  scroller: HTMLDivElement;
  setTheme: (theme: Theme) => void;
};

type FooterDesktopState = {};

export class FooterDesktop extends React.Component<
  FooterDesktopProps,
  FooterDesktopState
> {
  constructor(props: FooterDesktopProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="footer-content">
        <div>
          <p className="footer-title">GearBot</p>
          <div className="footer-links">
            {footerLinks.map((footerLink: FooterLink, index: number) => {
              return footerLink.external ? (
                <a
                  key={"footer-link-" + index}
                  href={footerLink.href}
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  {footerLink.name}
                </a>
              ) : (
                <Link
                  key={"footer-link-" + index}
                  className="footer-link"
                  to={footerLink.href}
                  onClick={() => (this.props.scroller.scrollTop = 0)}
                >
                  {footerLink.name}
                </Link>
              );
            })}
          </div>
          <div className="copyright-notice" style={{ marginTop: 40 }}>
            <span>
              {getString("copyright_notice", {
                year: new Date().getFullYear(),
              })}
            </span>
            <span className="name">{getString("gearbot_team")}</span>
          </div>
        </div>
        <Grid style={{ gridTemplateRows: "1fr auto" }}>
          <GearBot className="svg_logo" width="74" height="74" />
          <ThemeContext.Consumer>
            {(theme: Theme) => {
              let ThemeIcon = theme === "dark" ? Sun : Moon;
              return (
                <GridRow cells={2}>
                  <ThemeIcon
                    className="svg_basic"
                    width={25}
                    height={25}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.props.setTheme(theme === "dark" ? "light" : "dark");
                    }}
                  />
                  <a
                    href={supportServerInvite}
                    target="_blank noreferrer"
                    style={{ display: "flex" }}
                  >
                    <DiscordLogo
                      className="svg_basic"
                      width={25}
                      style={{ marginLeft: "auto" }}
                    />
                  </a>
                </GridRow>
              );
            }}
          </ThemeContext.Consumer>
        </Grid>
      </div>
    );
  }
}

type FooterMobileProps = {
  scroller: HTMLDivElement;
  setTheme: (theme: Theme) => void;
};

type FooterMobileState = {};

export class FooterMobile extends React.Component<
  FooterMobileProps,
  FooterMobileState
> {
  constructor(props: FooterMobileProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="footer-content">
        <div>
          <p className="footer-title">GearBot</p>
          <div className="footer-links">
            {footerLinks.map((footerLink: FooterLink, index: number) => {
              return footerLink.external ? (
                <a
                  key={"footer-link-" + index}
                  href={footerLink.href}
                  rel="noopener noreferrer"
                  className="footer-link"
                  onClick={() => (this.props.scroller.scrollTop = 0)}
                >
                  {footerLink.name}
                </a>
              ) : (
                <Link
                  key={"footer-link-" + index}
                  className="footer-link"
                  to={footerLink.href}
                  onClick={() => (this.props.scroller.scrollTop = 0)}
                >
                  {footerLink.name}
                </Link>
              );
            })}
            <ThemeContext.Consumer>
              {(theme) => {
                let ThemeIcon = theme === "dark" ? Sun : Moon;
                return (
                  <ThemeIcon
                    className="svg_basic"
                    width={25}
                    height={25}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.props.setTheme(theme === "dark" ? "light" : "dark");
                    }}
                  />
                );
              }}
            </ThemeContext.Consumer>
          </div>
          <div className="copyright-notice" style={{ marginTop: 40 }}>
            <span>
              {getString("copyright_notice", {
                year: new Date().getFullYear(),
              })}
            </span>
            <span className="name">{getString("gearbot_team")}</span>
          </div>
        </div>
      </div>
    );
  }
}

type FooterProps = {
  pageWidth: number;
  scroller: HTMLDivElement;
  setTheme: (theme: Theme) => void;
};

type FooterState = {};

export default class Footer extends React.Component<FooterProps, FooterState> {
  constructor(props: FooterProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="footer">
        {this.props.pageWidth > navBarMobileThreshold ? (
          <FooterDesktop
            scroller={this.props.scroller}
            setTheme={this.props.setTheme}
          />
        ) : (
          <FooterMobile
            scroller={this.props.scroller}
            setTheme={this.props.setTheme}
          />
        )}
      </div>
    );
  }
}
