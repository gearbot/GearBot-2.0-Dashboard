import React from "react";
import { GearTeamMember } from "../Other/Types";
import { capStringLength, getProfilePicture } from "../Other/Utils";
import { GridRow } from "./GridRow";

//SVGs
import { ReactComponent as GitHub } from "../SVG/github.svg";
import { ReactComponent as Twitter } from "../SVG/twitter.svg";
import { ReactComponent as Globe } from "../SVG/globe.svg";

type UserCardProps = {
  user: GearTeamMember;
};

type UserCardState = {
  hover: boolean;
};

export default class UserCard extends React.Component<
  UserCardProps,
  UserCardState
> {
  constructor(props: UserCardProps) {
    super(props);
    this.state = {
      hover: false,
    };
  }

  render() {
    return (
      <div
        className="user-card"
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <div className="info">
          <div className="avatar">
            <img
              alt=""
              src={getProfilePicture(this.props.user, this.state.hover)}
              draggable={false}
            />
          </div>
          <p className="username">
            {capStringLength(this.props.user.username, 16)}
          </p>
          <span className="discriminator">
            #{this.props.user.discriminator}
          </span>
        </div>
        <div className="socials">
          <GridRow
            gap={10}
            full_width={false}
            cells={Object.keys(this.props.user.socials).length}
          >
            {this.props.user.socials.github && (
              <a
                href={"https://github.com/" + this.props.user.socials.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHub className="svg_basic social" />
              </a>
            )}
            {this.props.user.socials.twitter && (
              <a
                href={"https://twitter.com/" + this.props.user.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="svg_basic social" />
              </a>
            )}
            {this.props.user.socials.personalSite && (
              <a
                href={this.props.user.socials.personalSite}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="svg_basic social" />
              </a>
            )}
          </GridRow>
        </div>
      </div>
    );
  }
}
