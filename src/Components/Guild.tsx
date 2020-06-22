import React from "react";
import { DiscordGuild } from "../Other/Types";
import {
  getGuildIcon,
  abbreviateGuildName,
  capStringLength,
} from "../Other/Utils";

type GuildProps = {
  guild: DiscordGuild;
};

type GuildState = {};

export default class Guild extends React.Component<GuildProps, GuildState> {
  render() {
    let guildIcon = getGuildIcon(this.props.guild);
    return (
      <div className="guild">
        <div className="icon">
          {guildIcon ? (
            <img src={guildIcon} draggable={false} alt="" />
          ) : (
            <span>{abbreviateGuildName(this.props.guild)}</span>
          )}
        </div>
        <p className="name">{capStringLength(this.props.guild.name, 16)}</p>
      </div>
    );
  }
}
