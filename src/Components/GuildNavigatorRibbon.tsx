import React from "react";
import {DiscordGuild} from "../Other/Types";

import "../scss/Components/guildnav-ribbon.scss";
import "../scss/colors.scss";
import {getGuildIcon} from "../Other/Utils";
import {Link} from "react-router-dom";
import {setShouldDisconnect} from "../App";
import {getString} from "../Language/LanguageHandler";
import {GridRow} from "./GridRow";

type GuildNavigatorRibbonProps = {
	guild: DiscordGuild;
};

type GuildNavigatorRibbonState = {};

const pages = [
	{
		name: getString("overview"),
		path: "overview",
	},
	{
		name: "Perms Page",
		path: "permissions",
	},
];

export default class GuildNavigatorRibbon extends React.Component<
	GuildNavigatorRibbonProps,
	GuildNavigatorRibbonState
> {
	render() {
		let guildIcon = getGuildIcon(this.props.guild);
		return (
			<>
				<div className="guildnav-ribbon" />
				<div className="guildnav-ribbon-content" style={{zIndex: 1}}>
					<div className="ribbon-icon basic-primary">
						{guildIcon ? (
							<img src={guildIcon} draggable={false} alt="" />
						) : (
							this.props.guild.name[0]
						)}
					</div>
					<span className="ribbon-label">
						{this.props.guild.name}
					</span>
					<div className="ribbon-buttons">
						<GridRow gap={10} cells="auto">
							{pages.map((page, index) => {
								let path = `/servers/${this.props.guild.id}/${page.path}`;
								let alreadyAtPath =
									window.location.pathname === path;
								let classes = "ribbon-button ";
								if (alreadyAtPath)
									classes += "accent full-text-color";
								else classes += "secondary text-color";
								return (
									<Link
										to={path}
										className={classes}
										key={"nav-" + index}
										onClick={(e) => {
											if (
												window.location.pathname ===
												path
											) {
												e.preventDefault();
											}
											setShouldDisconnect(false);
										}}
									>
										{page.name}
									</Link>
								);
							})}
							<Link
								to="/servers"
								className="ribbon-button accent full-text-color"
								onClick={() => setShouldDisconnect(false)}
							>
								{getString("back")}
							</Link>
						</GridRow>
					</div>
				</div>
			</>
		);
	}
}
