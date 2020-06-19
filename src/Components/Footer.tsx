/** @format */

import React from "react";
import { getSVGPath } from "../Other/Utils";
import { navBarMobileThreshold } from "../Other/Constants";
import { getString } from "../Language/LanguageHandler";

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
          <p>{getString("add_gearbot")}</p>
          <p>{getString("commands")}</p>
          <p>{getString("faq")}</p>
          <div className="copyright-notice" style={{ marginTop: 40 }}>
            <span>
              {getString("copyright_notice", {
                year: new Date().getFullYear(),
              })}
            </span>
            <span className="name">{getString("gearbot_team")}</span>
          </div>
        </div>
        <div>
          <img src={getSVGPath("icon")} width="80px" height="80px" />
        </div>
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
      <div>
        <p>smol</p>
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
