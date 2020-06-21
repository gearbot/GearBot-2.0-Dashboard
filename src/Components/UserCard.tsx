import React from "react";
import { GearTeamMember } from "../Other/Types";
import { capStringLength, getProfilePicture, getSVGPath } from "../Other/Utils";
import { GridRow } from "./GridRow";

type UserCardProps = {
  user: GearTeamMember;
};

type UserCardState = {};

export default class UserCard extends React.Component<
  UserCardProps,
  UserCardState
> {
  render() {
    return (
      <div className="user-card">
        <div className="info">
          <div className="avatar">
            <img
              alt=""
              src={getProfilePicture(this.props.user)}
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
                <img
                  className="social"
                  src={getSVGPath("github")}
                  draggable={false}
                />
              </a>
            )}
            {this.props.user.socials.twitter && (
              <a
                href={"https://twitter.com/" + this.props.user.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="social"
                  src={getSVGPath("twitter")}
                  draggable={false}
                />
              </a>
            )}
            {this.props.user.socials.personalSite && (
              <a
                href={this.props.user.socials.personalSite}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="social"
                  src={getSVGPath("globe")}
                  draggable={false}
                />
              </a>
            )}
          </GridRow>
        </div>
      </div>
    );
  }
}
