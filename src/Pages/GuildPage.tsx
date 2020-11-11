import React from "react";
import GuildNavigatorRibbon from "../Components/GuildNavigatorRibbon";
import { DiscordGuild } from "../Other/Types";
import { allPermissions, PERMISSION, PERMS_HELP } from "../Other/PermissionUtils";
import PermissionsPreviewBox from "../Components/PermissionsPreviewBox";
import Dropdown from "../Components/Dropdown";
import { getString } from "../Language/LanguageHandler";
import { formatWithElements } from "../Other/Utils";
import { Link } from "react-router-dom";
import "../scss/generic.scss";
import Grid from "../Components/Grid";
import CheckBox from "../Components/CheckBox";


type GuildPageProps = {
  guild: DiscordGuild;
}

type GuildPageState = {
  channels: string[]; // DiscordChannel[];
  currentChannel: string;
  permValue: number;
  additionalRequiredPerms: PERMISSION[];
}

export default class GuildPage extends React.Component<GuildPageProps, GuildPageState> {
  constructor(props: GuildPageProps) {
    super(props);
    this.state = {
      permValue: allPermissions(),
      channels: ["Channel A", "Channel B", "Channel C", "Channel D"],
      currentChannel: "Channel A",
      additionalRequiredPerms: []
    }
  }

  render() {
    return (
      <div style={{width: "100%"}}>
        <GuildNavigatorRibbon guild={this.props.guild} />
        <h2>{getString("bot_perms")}</h2>
        <p>
          {formatWithElements(
            {
              "adding_gearbot_docs_link": (
                <Link to="/docs/Configuration/Adding%20GearBot">
                  {getString("docs_adding_gearbot")}
                </Link>
              )
            },
            getString("bot_perms_help")
          )}
        </p>
        <div className="bar" style={{width: "100%", marginBottom: 10}}>
          <span style={{ marginRight: 20 }}>{getString("choose_channel")}</span>
          <Dropdown
            options={this.state.channels}
            value={this.state.currentChannel}
            onChange={(value: string) => this.setState({currentChannel: value})}
          />
        </div>
        <div className="box basic-secondary">
          <h2 className="text-center">Bot Usage</h2>
          <p className="text-center">What would you like to be able to do in this channel?</p>
          <Grid className="full-width" gap={10}>
            {PERMS_HELP.map(
              perm => {
                let checked = this.state.additionalRequiredPerms.includes(perm.required_permission);
                return (
                  <div className="box-2 secondary" key={"perms-help-" + +perm.required_permission}>
                    <CheckBox
                      checked={checked}
                      onChange={
                        (newState: boolean) => {
                          let additionalRequiredPerms = [...this.state.additionalRequiredPerms];
                          if (newState)
                            additionalRequiredPerms.push(perm.required_permission);
                          else
                          {
                            let index = additionalRequiredPerms.indexOf(perm.required_permission);
                            console.log(index);
                            additionalRequiredPerms.splice(index, 1);
                          }
                          this.setState({
                            additionalRequiredPerms: additionalRequiredPerms
                          });
                        }
                      }
                    />
                    <span className="label">{perm.explanation}</span>
                  </div>
                )
              }
            )}
          </Grid>
        </div>
        <br />
        <PermissionsPreviewBox permission_value={355408} required_perms={this.state.additionalRequiredPerms}/>
        <br />
      </div>
    )
  }
}