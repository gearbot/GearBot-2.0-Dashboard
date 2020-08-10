import React from "react";
import { LogEntry, LogType } from "../Other/Types";
import { formatWithElements } from "../Other/Utils";
import SmallUser from "./SmallUser";
import Grid from "./Grid";
import { GridRow } from "./GridRow";
import { getString } from "../Language/LanguageHandler";

//SVGs
import { ReactComponent as Hamburger } from "../SVG/hamburger.svg";
import { ReactComponent as Collapse } from "../SVG/collapse.svg";
import { ReactComponent as Arrow } from "../SVG/arrow.svg";
import { ReactComponent as IconBan } from "../SVG/ban.svg";
import { ReactComponent as IconKick } from "../SVG/kick.svg";

type LogEntryInformationProps = {
  tagName: string;
  tag: string;
};

class LogEntryInformation extends React.Component<
  LogEntryInformationProps,
  {}
> {
  render() {
    return (
      <div className="log-entry-information-field">
        <Arrow
          style={{ marginRight: 20, userSelect: "none" }}
          className="svg_arrow"
        />
        <span className="item-name">{this.props.tagName}</span>
        <span className="item">{this.props.tag}</span>
      </div>
    );
  }
}

const LOGTYPE_ICONS: { [key in LogType]: any } = {
  BAN: IconBan,
  KICK: IconKick,
};

type LogEntryComponentProps = {
  logEntry: LogEntry;
};

type LogEntryComponentState = {
  expanded: boolean;
};

// TODO: support changing of user positions based on translation strings.

export default class LogEntryComponent extends React.Component<
  LogEntryComponentProps,
  LogEntryComponentState
> {
  constructor(props: LogEntryComponentProps) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  render() {
    let HamburgerIcon = this.state.expanded ? Collapse : Hamburger;
    let Icon = LOGTYPE_ICONS[this.props.logEntry.logType];
    return (
      <div>
        <div
          className={
            "log-entry full-width" + (this.state.expanded ? " expanded" : "")
          }
          onClick={() => this.setState({ expanded: !this.state.expanded })}
        >
          <GridRow cell_override="1fr auto">
            <div style={{ display: "flex" }}>
              <div className="icon">
                <Icon className={this.props.logEntry.logType} />
              </div>
              <Grid
                style={{
                  gridTemplateRows: "16px 16px",
                  height: 36,
                  margin: "auto",
                  marginLeft: 20,
                }}
                gap={4}
              >
                <div className="action">
                  {formatWithElements(
                    {
                      author: <SmallUser user={this.props.logEntry.author} />,
                      target: <SmallUser user={this.props.logEntry.target} />,
                    },
                    getString(
                      `action_${this.props.logEntry.logType.toLowerCase()}`
                    )
                  )}
                </div>
                <div className="reason">
                  <span>{this.props.logEntry.reason}</span>
                </div>
              </Grid>
            </div>
            <HamburgerIcon className="svg_auditlog-control log-hamburger" />
          </GridRow>
        </div>
        {this.state.expanded && (
          <div className="log-entry-information">
            <Grid gap={16}>
              <LogEntryInformation
                tagName="Author ID"
                tag={this.props.logEntry.author.id}
              />
              <LogEntryInformation
                tagName="Target ID"
                tag={this.props.logEntry.target.id}
              />
            </Grid>
          </div>
        )}
      </div>
    );
  }
}
