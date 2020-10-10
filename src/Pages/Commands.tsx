import React from "react";
import CommandData from "../Data/commands.json";
import { Command } from "../Other/Types";
import { permissionLevels } from "../Other/Constants";
import { getString, getCommandDescription } from "../Language/LanguageHandler";

function renderCommand(commandName: string, command: Command) {
  return (
    <tr style={{ width: "100%" }} key={"command-" + commandName}>
      <td>{commandName}</td>
      <td>
        {command.aliases.length > 0
          ? command.aliases.join(", ")
          : getString("no_aliases")}
      </td>
      <td>
        {permissionLevels[command.commandlevel]} ({command.commandlevel})
      </td>
      <td style={{ wordWrap: "break-word", maxWidth: "30em" }}>
        {getCommandDescription(command.description)}
      </td>
      <td>{command.example}</td>
    </tr>
  );
}

function renderCommands(commands: { [key: string]: Command }) {
  return Object.keys(commands).map(
    (commandName: string, commandIndex: number) => {
      let command = commands[commandName];
      return (
        <React.Fragment key={commandName + "-" + commandIndex}>
          {renderCommand(commandName, command)}
        </React.Fragment>
      );
    }
  );
}

function getFilteredCommands(
  commands: { [key: string]: Command },
  names: string[],
  filter: string
) {
  let filteredCommands: { [key: string]: Command } = {};
  Object.keys(commands).forEach((key, index) => {
    let command = commands[key];
    if (names[index].includes(filter)) filteredCommands[key] = command;
    let filteredSubcommands = getFilteredCommands(
      command.subcommands,
      Object.keys(command.subcommands).map(
        (subcommand_key) => `${key} ${subcommand_key}`
      ),
      filter
    );
    Object.keys(filteredSubcommands).forEach((subcommand_key) => {
      filteredCommands[`${key} ${subcommand_key}`] =
        filteredSubcommands[subcommand_key];
    });
  });
  return filteredCommands;
}

type CommandsProps = {};

type CommandsState = {
  search: string;
};

export default class Commands extends React.Component<
  CommandsProps,
  CommandsState
> {
  constructor(props: CommandsProps) {
    super(props);
    this.state = {
      search: "",
    };
  }

  render() {
    let commandData = CommandData as { [key: string]: any };
    let commandTables = Object.keys(commandData).map(
      (section: string, index: number) => {
        let commands = commandData[section] as { [key: string]: Command };
        let tableContents = renderCommands(
          getFilteredCommands(
            commands,
            Object.keys(commands),
            this.state.search
          )
        );
        if (tableContents.length === 0) return undefined;
        return (
          <React.Fragment key={"table-" + index}>
            <h2>
              {section} - ({tableContents.length})
            </h2>
            <div className="commands-table-container">
              <table>
                <thead>
                  <tr>
                    <th>{getString("command")}</th>
                    <th>{getString("aliases")}</th>
                    <th>{getString("permission_level")}</th>
                    <th>{getString("description")}</th>
                    <th>{getString("example")}</th>
                  </tr>
                </thead>
                <tbody>{tableContents}</tbody>
              </table>
            </div>
          </React.Fragment>
        );
      }
    );
    return (
      <div style={{ width: "100%", marginBottom: 30, marginTop: 30 }}>
        <div style={{ display: "flex", placeContent: "center" }}>
          <input
            placeholder="Search by command name..."
            value={this.state.search}
            onChange={(value) => {
              if (value.target.value === "dabbit") {
                window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
                this.setState({
                  search: "Did I get you?",
                });
                return;
              }
              this.setState({
                search: value.target.value,
              });
            }}
            style={{ width: "50%" }}
          />
        </div>
        {commandTables.filter((table) => table).length > 0 ? (
          commandTables
        ) : (
          <div className="commands-no-result-parent">
            <h2>{getString("command_not_found")}</h2>
          </div>
        )}
      </div>
    );
  }
}
