import React from "react";
import {Redirect} from "react-router-dom";
import {defaultGuildSettingsTab, dummyGuild} from "../Other/Constants";
import GuildList from "./GuildList";
import GuildPage from "./GuildPage";
import SettingsOverview from "./SettingsOverview";
import {DiscordGuild} from "../Other/Types";
import {setShouldDisconnect, shouldDisconnect} from "../App";
import LoadingScreen from "../Components/LoadingScreen";

const dummyServers: {[key: string]: DiscordGuild} = {
	"365498559174410241": dummyGuild,
};

type ServersProps = {
	match: {
		params: {
			guildid?: string;
			tab?: string;
		};
	};
};

type ServersState = {
	websocketConnected: boolean;
};

let ws: WebSocket;

export default class Servers extends React.Component<
	ServersProps,
	ServersState
> {
	constructor(props: ServersProps) {
		super(props);
		this.state = {
			websocketConnected: ws !== undefined && ws.readyState === ws.OPEN,
		};
		this.connectWebSocket = this.connectWebSocket.bind(this);
	}

	connectWebSocket() {
		if (ws !== undefined) {
			console.log("wsclosed", ws.readyState === ws.CLOSED);
			console.log("wsclosing", ws.readyState === ws.CLOSING);
		}
		if (
			ws === undefined ||
			ws.readyState === ws.CLOSED ||
			ws.readyState === ws.CLOSING
		) {
			ws = new WebSocket("wss://echo.websocket.org");
			ws.onopen = () => this.setState({websocketConnected: true});
			ws.onclose = () => {
				this.setState({websocketConnected: false});
				this.connectWebSocket();
			};
		}
	}

	componentDidMount() {
		this.connectWebSocket();
	}

	componentWillUnmount() {
		console.log(shouldDisconnect);
		if (shouldDisconnect) {
			// prevent warning
			ws.onclose = null;
			ws.close();
		} else {
			setShouldDisconnect(true);
		}
	}

	render() {
		let tab = this.props.match.params.tab;

		if (!this.state.websocketConnected) return <LoadingScreen instant />;

		if (this.props.match.params.guildid === undefined) return <GuildList />;

		const guild = dummyServers[this.props.match.params.guildid];

		if (tab === undefined)
			return (
				<Redirect
					to={`/servers/${this.props.match.params.guildid}/${defaultGuildSettingsTab}`}
				/>
			);

		if (guild !== undefined) {
			if (tab === "permissions") return <GuildPage guild={guild} />;
			else if (tab === "overview")
				return <SettingsOverview guild={guild} />;
		}

		return (
			<div
				style={{
					placeContent: "center",
					width: "100%",
					alignItems: "center",
					display: "flex",
				}}
			>
				<h1 style={{fontSize: 50}}>404</h1>
			</div>
		);
	}
}
