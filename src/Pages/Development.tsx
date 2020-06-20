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
import { GridRow } from "../Components/GridRow";

const dummyUsers: DiscordUser[] = [
  {
    username: "JohnyTheCarrot",
    discriminator: "0001",
    id: "132819036282159104",
    avatar: "cd1027e339b0e0a1001fd84cf7e3be13",
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
    logType: "BAN",
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

type DevelopmentProps = {};

type DevelopmentState = {};

export default class Development extends React.Component<
  DevelopmentProps,
  DevelopmentState
> {
  render() {
    return (
      <div className="page-development">
        <h1>Development Page</h1>
        <Grid gap={10}>
          {dummyLogEntries.map((logEntry: LogEntry, index: number) => {
            return <LogEntryComponent key={index} logEntry={logEntry} />;
          })}
        </Grid>
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
      </div>
    );
  }
}
