import React from "react";
import {GearTeamMember, Theme} from "../Other/Types";
import {getString} from "../Language/LanguageHandler";
import UserCard from "../Components/UserCard";
import {useQuery} from "react-query";
import {getApiUrl} from "../Other/Utils";
import LoadingScreen from "../Components/LoadingScreen";
import CrashScreenErrorBoundary from "./CrashScreenErrorBoundary";

type MeetTheTeamProps = {
    pageWidth: number;
    theme: Theme;
};

type MeetTheTeamState = {};
const teams = [
    {
        name: "Core Team",
        description: "The core team responsible for most of the heavy lifting in making sure the gears keep turning smoothly.",
        key: "core"
    },
    {
        name: "Contributors",
        description: "These people helped to make GearBot even better.",
        key: "contributors"
    },
    {
        name: "Website",
        description: "The team that made this amazing website.",
        key: "website"
    },
    {
        name: "Website design",
        description: "Made the amazing design for this website.",
        key: "design"
    },
    {
        name: "Emoji Design",
        description: "People who made the amazing emoji GearBot uses.",
        key: "emoji"
    }
];
export default function MeetTheTeam() {
    const {isLoading, error, data} = useQuery('teamMembers', () =>
        fetch(getApiUrl('team_info')).then(res =>
            res.json()
        ));

    if (isLoading) {
        return (<LoadingScreen/>)
    }
    console.log(data);

    return (
        <div className="page-meet-the-team">
            <h1>{getString("meet_the_team")}</h1>
            {
                teams.map(({name, description, key}) => {
                    console.log(name);
                    return (
                        <div key={`team-${name}`}>
                            <h2>{name}</h2>
                            <p>{description}</p>
                            <div className="team-members">

                            {data.filter((member: { team: string; }) => member.team === key).map((member: GearTeamMember, index: number) => {
                                return (
                                    <UserCard user={member} key={`usercard-${index}`}/>
                                );
                            })
                            }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
