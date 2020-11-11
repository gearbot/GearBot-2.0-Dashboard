import React from "react";
import { Redirect } from "react-router-dom";
import { setShouldDisconnect } from "../App";
import { defaultGuildSettingsTab } from "../Other/Constants";
import { DiscordGuild } from "../Other/Types";
import {
  getGuildIcon,
  abbreviateGuildName,
  capStringLength,
} from "../Other/Utils";

type GuildCardProps = {
  guild: DiscordGuild;
  shouldDisconnectWebSocket?: boolean;
};

type GuildStateProps = {
  clicked?: boolean;
};

export default class GuildCard extends React.Component<GuildCardProps, GuildStateProps> {
  constructor(props: GuildCardProps)
  {
    super(props);
    this.state = {};
  }
  render() {
    let guildIcon = getGuildIcon(this.props.guild);

    if (this.state.clicked)
    {
      if (this.props.shouldDisconnectWebSocket === false || this.props.shouldDisconnectWebSocket === undefined)
        setShouldDisconnect(false);
      return <Redirect push to={"/servers/" + this.props.guild.id + "/" + defaultGuildSettingsTab} />  
    }
    
    return (
      <div className="guild" onClick={() => this.setState({ clicked: true })}>
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
