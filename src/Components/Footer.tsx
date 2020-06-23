/** @format */

import React from "react";
import { getSVGPath, getThemedSVGPath } from "../Other/Utils";
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

type FooterDesktopProps = {
  scroller: HTMLDivElement;
  theme: Theme;
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
          <img
            src={getSVGPath("icon")}
            alt="gearbot logo"
            width="80px"
            height="80px"
          />
          <GridRow cells={2}>
            <img
              width={25}
              style={{ cursor: "pointer" }}
              src={getThemedSVGPath(
                this.props.theme,
                this.props.theme === "dark" ? "sun" : "moon"
              )}
              alt={this.props.theme + " theme"}
              onClick={() => {
                this.props.setTheme(
                  this.props.theme === "dark" ? "light" : "dark"
                );
              }}
            />
            <a
              href={supportServerInvite}
              target="_blank noreferrer"
              style={{ display: "flex" }}
            >
              <img
                alt="Discord Support Server"
                src={getThemedSVGPath(this.props.theme, "Discord-Logo")}
                style={{ marginLeft: "auto" }}
                width={25}
              />
            </a>
          </GridRow>
        </Grid>
      </div>
    );
  }
}

type FooterMobileProps = {
  scroller: HTMLDivElement;
  theme: Theme;
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
            <img
              width={25}
              style={{ cursor: "pointer", marginTop: 8 }}
              src={getThemedSVGPath(
                this.props.theme,
                this.props.theme === "dark" ? "sun" : "moon"
              )}
              alt={this.props.theme + " theme"}
              onClick={() => {
                this.props.setTheme(
                  this.props.theme === "dark" ? "light" : "dark"
                );
              }}
            />
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
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

type FooterState = {};

export class Footer extends React.Component<FooterProps, FooterState> {
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
            theme={this.props.theme}
            setTheme={this.props.setTheme}
          />
        ) : (
          <FooterMobile
            scroller={this.props.scroller}
            theme={this.props.theme}
            setTheme={this.props.setTheme}
          />
        )}
      </div>
    );
  }
}
