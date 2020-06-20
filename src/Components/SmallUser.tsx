import React from "react";
import { getProfilePicture } from "../Other/Utils";
import { DiscordUser } from "../Other/Types";

type SmallUserProps = {
  user: DiscordUser;
};

type SmallUserState = {};

export default class SmallUser extends React.Component<
  SmallUserProps,
  SmallUserState
> {
  render() {
    return (
      <div className="user small">
        <div className="avatar">
          <img alt="" src={getProfilePicture(this.props.user)} />
        </div>
        <span className="username">{this.props.user.username}</span>#
        <span className="discriminator">{this.props.user.discriminator}</span>
      </div>
    );
  }
}
