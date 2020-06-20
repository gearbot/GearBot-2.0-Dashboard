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
        <p>{getCommandDescription(command.description)}</p>
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
          {Object.keys(command.subcommands).map(
            (subCommandName: string, subCommandIndex: number) => {
              let subCommand = command.subcommands[subCommandName];
              return renderCommand(
                `${commandName} ${subCommandName}`,
                subCommand
              );
            }
          )}
        </React.Fragment>
      );
    }
  );
}

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
    let commandData = CommandData as { [key: string]: any };
    return (
      <div style={{ width: "100%", marginBottom: 30 }}>
        {Object.keys(commandData).map((section: string, index: number) => {
          let commands = commandData[section] as { [key: string]: Command };
          return (
            <React.Fragment key={"table-" + index}>
              <h2>{section}</h2>
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
                  <tbody>{renderCommands(commands)}</tbody>
                </table>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}
