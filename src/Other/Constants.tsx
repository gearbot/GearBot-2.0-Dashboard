/** @format */

import {
	GearRawRoute,
	FooterLink,
	NavBarTab,
	Theme,
	DiscordUser,
	DiscordGuild,
} from "./Types";
import {getString} from "../Language/LanguageHandler";
import React from "react";

export const navBarMobileThreshold = 1100;

export const botInvite =
	"https://discord.com/oauth2/authorize?client_id=349977940198555660&scope=bot&permissions=1476783350";

export const supportServerInvite = "https://discord.gg/EKautd5";

export const defaultTheme: Theme = "dark";

export const permissionLevels: string[] = [
	"Public",
	"Trusted",
	"Mod",
	"Admin",
	"Specific People",
	"Server Owner",
	"Disabled",
];

export const dummyUser: DiscordUser = {
	username: "AEnterprise",
	discriminator: "4693",
	id: "106354106196570112",
	avatar: "a_830b0d2082e9b84d00816eae9324d29e",
};

export const defaultGuildSettingsTab = "overview";

export const dummyGuild: DiscordGuild = {
	name: "The Gearbox",
	owner: dummyUser,
	id: "365498559174410241",
	icon: "a_8b7ebc6c35b4830c9645a7dc5a18c498",
};

export const navBarTabs: NavBarTab[] = [
	{
		name: getString("add_gearbot"),
		external: true,
		href: botInvite,
	},
	{
		name: getString("documentation"),
		external: false,
		href: "/docs",
	},
	{
		name: getString("commands"),
		external: false,
		href: "/commands",
	},
	{
		name: getString("meet_the_team"),
		external: false,
		href: "/team",
	},
];

export const routes: GearRawRoute[] = [
	{
		path: "/",
		exact: true,
		component_file_name: "Home",
	},
	{
		path: "/docs/:section/:subsection",
		exact: true,
		component_file_name: "Documentation",
	},
	{
		path: "/docs/:section",
		exact: true,
		component_file_name: "Documentation",
	},
	{
		path: "/docs",
		exact: true,
		component_file_name: "Documentation",
	},
	{
		path: "/servers",
		exact: true,
		component_file_name: "Servers",
	},
	{
		path: "/servers/:guildid",
		exact: true,
		component_file_name: "Servers",
	},
	{
		path: "/servers/:guildid/:tab",
		exact: true,
		component_file_name: "Servers",
	},
	{
		path: "/commands",
		exact: true,
		component_file_name: "Commands",
	},
	{
		path: "/team",
		exact: true,
		component_file_name: "MeetTheTeam",
	},
	{
		path: "/__development",
		exact: true,
		component_file_name: "Development",
	},
	{
		path: "/privacy_policy",
		exact: true,
		component_file_name: "PrivacyPolicy",
	},
];

export const footerLinks: FooterLink[] = [
	{
		external: false,
		href: "/",
		name: getString("home"),
	},
	{
		external: true,
		href: botInvite,
		name: getString("add_gearbot"),
	},
	{
		external: false,
		href: "/commands",
		name: getString("commands"),
	},
	{
		external: false,
		href: "/docs",
		name: getString("documentation"),
	},
	{
		external: false,
		href: "/team",
		name: getString("meet_the_team"),
	},
	{
		external: false,
		href: "/privacy_policy",
		name: getString("privacy_policy"),
	},
	{
		external: false,
		href: "/docs/Other/Supporting%20GearBot",
		name: getString("support_gearbot"),
	},
];

// contexts

export const ThemeContext = React.createContext(defaultTheme as Theme);

export const ChangeThemeContext = React.createContext((theme: Theme) => {});
