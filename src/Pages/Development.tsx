/**
 * This page is for development purposes, you can freely test your components here.
 * This will be shipped with the final product, and will even resolve when requested at /__development.
 * There will be no navigation pointing to this page.
 */

import Grid from "../Components/Grid";
import LogEntryComponent from "../Components/LogEntryComponent";
import React from "react";
import { LogEntry, DiscordUser, DiscordGuild } from "../Other/Types";
import Guild from "../Components/Guild";
import Selector from "../Components/Selector";
import Dropdown from "../Components/Dropdown";
import { GridRow } from "../Components/GridRow";
import { UserProfile } from "../Components/UserProfile";
import { VERSION } from "../version";

const dummyUsers: DiscordUser[] = [
  {
    username: "JohnyTheCarrot",
    discriminator: "0001",
    id: "132819036282159104",
    avatar: "c48e8f0943f2b056c5830bfd98d3e057",
  },
  {
    username: "AEnterprise",
    discriminator: "4693",
    id: "106354106196570112",
    avatar: "a_830b0d2082e9b84d00816eae9324d29e",
  },
];

const dummyGuild: DiscordGuild = {
  name: "The Gearbox",
  owner: dummyUsers[1],
  id: "365498559174410241",
  icon: "a_8b7ebc6c35b4830c9645a7dc5a18c498",
};

const dummyGuild2: DiscordGuild = {
  name: "Johny's Development Server",
  owner: dummyUsers[0],
  id: "123",
};

const dummyLogEntries: LogEntry[] = [
  {
    logType: "KICK",
    author: dummyUsers[1],
    target: dummyUsers[0],
    reason: "Being a big dummy.",
  },
  {
    logType: "BAN",
    author: dummyUsers[1],
    target: dummyUsers[0],
    reason: "Writing bad code.",
  },
];

type DevelopmentProps = {
  pageWidth: number;
};

type DevelopmentState = {
  dropdown1Value: string;
  dropdown2Value: string;
};

export default class Development extends React.Component<
  DevelopmentProps,
  DevelopmentState
> {
  constructor(props: DevelopmentProps) {
    super(props);
    this.state = {
      dropdown1Value: "Select",
      dropdown2Value: "Select",
    };
  }

  render() {
    return (
      <div className="page-development">
        <h1 style={{ marginBottom: 5 }}>Development Page</h1>
        <p style={{ marginTop: 5 }}>
          You have caught a rare development page. This page is a sort of
          'testing ground' for the people who make this site.
        </p>
        <p>
          <b>version:</b> {VERSION}
        </p>
        <Grid gap={10}>
          <div className="bar">
            <span style={{ marginRight: 20 }}>Text</span>
            <Dropdown
              parentStyle={{ marginRight: 10 }}
              style={{ width: 80 }}
              options={["AAAA", "BBBB", "CCCC", "DDDD"]}
              value={this.state.dropdown1Value}
              onChange={(newValue: string) =>
                this.setState({
                  dropdown1Value: newValue,
                })
              }
            />
            <Dropdown
              style={{ width: 80 }}
              options={["EEEE", "FFFF", "GGGG", "HHHH"]}
              value={this.state.dropdown2Value}
              onChange={(newValue: string) =>
                this.setState({
                  dropdown2Value: newValue,
                })
              }
            />
          </div>
          {dummyLogEntries.map((logEntry: LogEntry, index: number) => {
            return <LogEntryComponent key={index} logEntry={logEntry} />;
          })}
        </Grid>
        <div style={{ display: "flex", placeContent: "center", marginTop: 20 }}>
          <div>
            <UserProfile user={dummyUsers[0]} withDropdown={true} />
          </div>
        </div>
        <div style={{ display: "flex", placeContent: "center" }}>
          <GridRow
            cells={2}
            full_width={false}
            style={{ marginTop: 20 }}
            gap={20}
          >
            <Guild guild={dummyGuild} />
            <Guild guild={dummyGuild2} />
          </GridRow>
        </div>
        <Grid gap={20} style={{ marginTop: 20 }}>
          <Selector title="Title Test" pageWidth={this.props.pageWidth}>
            <Guild guild={dummyGuild} />
            <Guild guild={dummyGuild2} />
            <Guild guild={dummyGuild} />
            <Guild guild={dummyGuild2} />
            <Guild guild={dummyGuild} />
            <Guild guild={dummyGuild2} />
            <Guild guild={dummyGuild} />
            <Guild guild={dummyGuild2} />
            <Guild guild={dummyGuild} />
            <Guild guild={dummyGuild2} />
          </Selector>
          <Selector title="Title Test 2" pageWidth={this.props.pageWidth}>
            <Guild guild={dummyGuild} />
            <Guild guild={dummyGuild2} />
            <Guild guild={dummyGuild} />
            <Guild guild={dummyGuild2} />
            <Guild guild={dummyGuild} />
            <Guild guild={dummyGuild2} />
            <Guild guild={dummyGuild} />
            <Guild guild={dummyGuild2} />
            <Guild guild={dummyGuild} />
            <Guild guild={dummyGuild2} />
          </Selector>
        </Grid>
      </div>
    );
  }
}
