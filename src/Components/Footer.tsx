/** @format */

import React from "react";
import { getSVGPath } from "../Other/Utils";
import {
  navBarMobileThreshold,
  supportServerInvite,
  footerLinks,
} from "../Other/Constants";
import { getString } from "../Language/LanguageHandler";
import Grid from "./Grid";
import { FooterLink } from "../Other/Types";
import { Link } from "react-router-dom";

type FooterDesktopProps = {};

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
          <a
            href={supportServerInvite}
            target="_blank noreferrer"
            style={{ display: "flex" }}
          >
            <img
              alt="Discord Support Server"
              src={getSVGPath("Discord-Logo-White")}
              style={{ marginLeft: "auto" }}
              width={25}
            />
          </a>
        </Grid>
      </div>
    );
  }
}

type FooterMobileProps = {};

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
                >
                  {footerLink.name}
                </a>
              ) : (
                <Link
                  key={"footer-link-" + index}
                  className="footer-link"
                  to={footerLink.href}
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
      </div>
    );
  }
}

type FooterProps = {
  pageWidth: number;
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
          <FooterDesktop />
        ) : (
          <FooterMobile />
        )}
      </div>
    );
  }
}
