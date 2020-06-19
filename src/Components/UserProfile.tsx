/** @format */

import React from "react";
import { DiscordUser } from "../Other/Types";
import { getProfilePicture, getSVGPath } from "../Other/Utils";
import { getString } from "../Language/LanguageHandler";

type UserProfileProps = {
  user: DiscordUser;
  withDropdown?: boolean;
};

type UserProfileState = {
  dropdownOpen: boolean;
};

export class UserProfile extends React.Component<
  UserProfileProps,
  UserProfileState
> {
  constructor(props: UserProfileProps) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
  }

  render() {
    return (
      <div className="user-profile">
        <div
          className="profile-content"
          onClick={() =>
            this.setState({
              dropdownOpen: !this.state.dropdownOpen,
            })
          }
        >
          <img
            className="avatar"
            alt=""
            src={getProfilePicture(this.props.user)}
          />
          <span className="username">{this.props.user.username}</span>
          <span className="discriminator">
            #{this.props.user.discriminator}
          </span>
          {this.props.withDropdown === true && (
            <img
              className="dropdown-icon"
              alt="dropdown"
              src={getSVGPath("dropdown")}
            />
          )}
        </div>
        {this.state.dropdownOpen && (
          <div className="dropdown" style={{ width: 160, top: 40 }}>
            <div>
              <p>{getString("profile_dropdown_report_bug")}</p>
            </div>
            <div>
              <p>{getString("profile_dropdown_feedback")}</p>
            </div>
            <div>
              <p className="alert-color">
                {getString("profile_dropdown_log_out")}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
