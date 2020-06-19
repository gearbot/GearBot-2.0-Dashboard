/** @format */

import React from "react";
import { getSVGPath } from "../Other/Utils";
import { GridRow } from "../Components/GridRow";
import { getString } from "../Language/LanguageHandler";
import { navBarMobileThreshold } from "../Other/Constants";

type ShowOffDesktopProps = {};

type ShowOffDesktopState = {};

export class ShowOffDesktop extends React.Component<
  ShowOffDesktopProps,
  ShowOffDesktopState
> {
  constructor(props: ShowOffDesktopProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="show-off">
          <div className="content">
            <div>
              <h1>Moderation for your Discord, easily managed.</h1>
              <p>
                Configure the best bot for your Discord server and easily setup
                custom commands, filters, and much more!
              </p>
              <GridRow
                gap={20}
                cells={2}
                style={{ width: "fit-content", marginTop: 20 }}
              >
                <button className="primary">{getString("add_gearbot")}</button>
                <button>View Commands</button>
              </GridRow>
            </div>
          </div>
          <div className="bg">
            <img src={getSVGPath("home-showoff-bg")} />
          </div>
        </div>
      </div>
    );
  }
}

type HomeProps = {
  pageWidth: number;
};

type HomeState = {};

export default class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page-home">
        {this.props.pageWidth > navBarMobileThreshold ? (
          <ShowOffDesktop />
        ) : (
          <div>S M O L</div>
        )}
      </div>
    );
  }
}
