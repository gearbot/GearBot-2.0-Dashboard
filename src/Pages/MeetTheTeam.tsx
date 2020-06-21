/**
 * This page is for MeetTheTeam purposes, you can freely test your components here.
 * This will be shipped with the final product, and will even resolve when requested at /__MeetTheTeam.
 * There will be no navigation pointing to this page.
 */

import React from "react";
import { GearTeamMember } from "../Other/Types";
import TeamGearBot from "../Data/teamgearbot.json";
import { getString } from "../Language/LanguageHandler";
import UserCard from "../Components/UserCard";

type MeetTheTeamProps = {
  pageWidth: number;
};

type MeetTheTeamState = {};

const teams: { [key: string]: string[] } = TeamGearBot.teams;

const users: { [key: string]: GearTeamMember } = TeamGearBot.users;

export default class MeetTheTeam extends React.Component<
  MeetTheTeamProps,
  MeetTheTeamState
> {
  render() {
    return (
      <div className="page-meet-the-team">
        <h1>{getString("meet_the_team")}</h1>
        {Object.keys(teams).map((team: string) => {
          return (
            <>
              <h2>{team}</h2>
              <div className="team-members">
                {teams[team].map((userID: string) => {
                  return <UserCard user={users[userID]} />;
                })}
              </div>
            </>
          );
        })}
      </div>
    );
  }
}
