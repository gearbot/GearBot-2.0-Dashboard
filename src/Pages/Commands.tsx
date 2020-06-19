/** @format */

import React from "react";

type CommandsProps = {};

type CommandsState = {};

export default class Commands extends React.Component<
  CommandsProps,
  CommandsState
> {
  constructor(props: CommandsProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          height: "100%",
        }}
      >
        <h1 style={{ margin: "auto" }}>COMMANDS</h1>
      </div>
    );
  }
}
