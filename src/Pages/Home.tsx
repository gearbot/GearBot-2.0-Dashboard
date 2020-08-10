import React from "react";
import { GridRow } from "../Components/GridRow";
import { getString } from "../Language/LanguageHandler";
import { navBarMobileThreshold, botInvite } from "../Other/Constants";
import { Link } from "react-router-dom";
import Grid from "../Components/Grid";

// SVGs
import { ReactComponent as GearBot } from "../SVG/gearbot.svg";

type ShowOffDesktopProps = {};

type ShowOffDesktopState = {};

class ShowOffDesktop extends React.Component<
  ShowOffDesktopProps,
  ShowOffDesktopState
> {
  constructor(props: ShowOffDesktopProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="show-off">
        <div className="bg">
          <GearBot className="svg_home-showoff-bg" />
        </div>
        <div className="content">
          <div>
            <h1>{getString("showoff_title")}</h1>
            <p>{getString("showoff_text")}</p>
            <GridRow
              gap={20}
              cells={2}
              full_width={false}
              style={{ width: "fit-content", marginTop: 20 }}
            >
              <a className="button primary" href={botInvite}>
                <span>{getString("add_gearbot")}</span>
              </a>
              <Link to="/commands" className="button">
                <span>{getString("view_commands")}</span>
              </Link>
            </GridRow>
          </div>
        </div>
      </div>
    );
  }
}

type ShowOffMobileProps = {};

type ShowOffMobileState = {};

class ShowOffMobile extends React.Component<
  ShowOffMobileProps,
  ShowOffMobileState
> {
  constructor(props: ShowOffDesktopProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>{getString("showoff_title")}</h1>
        <p>{getString("showoff_text")}</p>
        <Grid gap={10}>
          <a className="button primary" href={botInvite}>
            <span>{getString("add_gearbot")}</span>
          </a>
          <Link to="/commands" className="button">
            <span>{getString("view_commands")}</span>
          </Link>
        </Grid>
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
          <ShowOffMobile />
        )}
      </div>
    );
  }
}
