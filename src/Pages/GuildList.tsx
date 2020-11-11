import React from "react";

import GuildCard from "../Components/GuildCard";
import Selector from "../Components/Selector";
import {getString} from "../Language/LanguageHandler";
import {dummyGuild, supportServerInvite} from "../Other/Constants";
import {formatWithElements} from "../Other/Utils";

type GuildListProps = {};

type GuildListState = {
	width: number;
};

export default class GuildList extends React.Component<
	GuildListProps,
	GuildListState
> {
	render() {
		return (
			<div style={{width: "100%"}}>
				<h1>{getString("servers")}</h1>
				<p>
					{formatWithElements(
						{
							feedback_link: (
								<a href={supportServerInvite}>
									{getString("feedback")}
								</a>
							),
						},
						getString("servers_help")
					)}
				</p>
				<Selector
					title={getString("gearbot_dashboard_available")}
					style={{marginTop: 40}}
				>
					<GuildCard guild={dummyGuild} />
					<GuildCard guild={dummyGuild} />
					<GuildCard guild={dummyGuild} />
					<GuildCard guild={dummyGuild} />
					<GuildCard guild={dummyGuild} />
					<GuildCard guild={dummyGuild} />
					<GuildCard guild={dummyGuild} />
					<GuildCard guild={dummyGuild} />
					<GuildCard guild={dummyGuild} />
					<GuildCard guild={dummyGuild} />
				</Selector>
				<Selector
					title={getString("selector_add_gearbot")}
					style={{marginTop: 40, marginBottom: 40}}
				>
					<GuildCard guild={dummyGuild} />
					<GuildCard guild={dummyGuild} />
					<GuildCard guild={dummyGuild} />
					<GuildCard guild={dummyGuild} />
					<GuildCard guild={dummyGuild} />
					<GuildCard guild={dummyGuild} />
					<GuildCard guild={dummyGuild} />
					<GuildCard guild={dummyGuild} />
					<GuildCard guild={dummyGuild} />
					<GuildCard guild={dummyGuild} />
				</Selector>
			</div>
		);
	}
}
