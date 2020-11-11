import React from "react";
import GuildNavigatorRibbon from "../Components/GuildNavigatorRibbon";
import {getString} from "../Language/LanguageHandler";
import {DiscordGuild} from "../Other/Types";

type SettingsOverviewProps = {
	guild: DiscordGuild;
};

export default class SettingsOverview extends React.Component<
	SettingsOverviewProps,
	{}
> {
	render() {
		return (
			<div style={{width: "100%"}}>
				<GuildNavigatorRibbon guild={this.props.guild} />
				<h2>{getString("overview")}</h2>
				<video controls>
					<source
						src="https://cdn.discordapp.com/attachments/356382135063412747/776011880685895700/nwZJ30keI0OeOszR.mp4"
						type="video/mp4"
					/>
				</video>
			</div>
		);
	}
}
