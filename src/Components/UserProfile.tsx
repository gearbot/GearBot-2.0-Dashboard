/** @format */

import React from "react";
import { DiscordUser, Theme } from "../Other/Types";
import { getProfilePicture } from "../Other/Utils";
import ToggleSwitch from "./ToggleSwitch";
import { getString } from "../Language/LanguageHandler";
import { ThemeContext, ChangeThemeContext } from "../Other/Constants";

//SVGs
import { ReactComponent as DropdownClosed } from "../SVG/dropdown-closed.svg";

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
            <DropdownClosed
              className="dropdown-icon svg_dropdown-closed"
              width={10}
              height={10}
            />
          )}
        </div>
        {this.state.dropdownOpen && (
          <div className="user-dropdown" style={{ width: 160, top: 40 }}>
            <div style={{ display: "flex" }}>
              <span>{getString("theme")}</span>
              <ThemeContext.Consumer>
                {(theme) => (
                  <ChangeThemeContext.Consumer>
                    {(setTheme: (theme: Theme) => void) => (
                      <ToggleSwitch
                        style={{ marginLeft: "auto" }}
                        open={theme === "light"}
                        onChange={() => {
                          setTheme(theme === "light" ? "dark" : "light");
                        }}
                      />
                    )}
                  </ChangeThemeContext.Consumer>
                )}
              </ThemeContext.Consumer>
            </div>
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
