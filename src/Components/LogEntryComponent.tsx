import React from "react";
import { LogEntry } from "../Other/Types";
import { getSVGPath } from "../Other/Utils";
import SmallUser from "./SmallUser";
import Grid from "./Grid";
import { GridRow } from "./GridRow";

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
      <div>
        <img alt="" style={{ marginRight: 20 }} src={getSVGPath("arrow")} />
        <span className="item-name">{this.props.tagName}</span>
        <span className="item">{this.props.tag}</span>
      </div>
    );
  }
}

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
                <img
                  src={getSVGPath(this.props.logEntry.logType)}
                  draggable="false"
                  alt={this.props.logEntry.logType}
                />
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
                  <SmallUser user={this.props.logEntry.author} />
                  <span className="name"> banned </span>
                  <SmallUser user={this.props.logEntry.target} />
                </div>
                <div className="reason">
                  <span>{this.props.logEntry.reason}</span>
                </div>
              </Grid>
            </div>
            <img
              alt={!this.state.expanded ? "open" : "close"}
              className="log-hamburger"
              src={getSVGPath(!this.state.expanded ? "hamburger" : "collapse")}
            />
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
