/**
 * This page is for development purposes, you can freely test your components here.
 * This will be shipped with the final product, and will even resolve when requested at /__development.
 * There will be no navigation pointing to this page.
 */

import Grid from "../Components/Grid";
import LogEntryComponent from "../Components/LogEntryComponent";
import React from "react";
import { LogEntry, DiscordUser } from "../Other/Types";

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
      </div>
    );
  }
}
