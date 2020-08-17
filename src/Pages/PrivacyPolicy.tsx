import React from "react";

export default class PrivacyPolicy extends React.Component<{}, {}> {

    render() {
        return (
            <div>
                <h1>Privacy Policy</h1>
                The GearBot core team (hereby referred to as "the team") strives for the greatest amount of transparency possible with our operations, and that includes what happens to the data that GearBot collects
                through being on your server and the commands used to interact with him on a daily basis, like infractions, message logging, etc. What exactly is being logged (if anything) depends on your server settings. See below for more information.

                <h2>Data Storage</h2>
                GearBot runs on a virtual private server (VPS) located inside the United States, copies of this data might be made for backup purposes or to test and prepare bot updates. This copies will only be kept for the minimum amount of time required for them to serve their purpose.

                <h2>What information does GearBot collect and why?</h2>
                GearBot is a highly configurable moderation bot, some data is only collected when the relevant server setting is enabled. Data is however never purged instantly when you disable a setting, if you do want this data to be purged after disabling the feature(s) please see the section below for how to request this data to be deleted.

                <h3>Message logs</h3>
                When the edit log feature is enabled GearBot will store all messages (content and metadata) it receives (GearBot requires read messages permission to receive messages from a channel) to be able to log the old content when it gets edited or deleted. This data is retained for 6 weeks.

                <h3>Anti-spam</h3>
                When anti-spam features are enabled GearBot will keep message content and metadata about the messages a user has send (like how many messages, how many links/newlines/.. they contained) in the last 5 minutes to be able to enforce these anti-spam rules. This data is retained for up to 5 minutes.

                <h3>Infractions</h3>
                The bot keeps a record of all moderation actions taken on users through commands (or through discord directly if audit log permission is granted). This information is only available to moderators of said server and is kept permanently unless requested to be removed by the server owner or a server admin.

                <h3>Timed commands</h3>
                Some commands require to store data they need later, for example reminders store the reminder text to show, in these instances the data is retained for as long as they are required.

                <h3>Error data</h3>
                When GearBot encounteres a problem executing a command we store the full event data and context for debugging purposes so the error can be fixed.

                <h3>Statistics</h3>
                To improve and monitor bot operations aggregate data is collected, GearBot collects anonymous data like how many commands (globally) are executed, how many messages where send and more. None of this data is linked to specific users or servers.

                <h3>Caching</h3>
                GearBot allows users to query basic user information from the discord api (like username/avatar/badges). This information can be cached by the bot for up to 1 hour to reduce the amount of api calls we have to make to the api.

                <h3>Other information</h3>
                Sometimes other information might be stored that is not tied to a specific user. For example custom commands are stored per server and only tied to a server, not individual users.

                <h2>Data Sharing and third-parties.</h2>
                None of your data, collected either passively or actively, through use of GearBot will ever be shared with third-parties for any reasons. In the event of a legal or law enforcement request, we are obligated to
                turn over what information the jurisdiction has requested under applicable law after confirming that we have information that may be relevant to an investigation.

                <h2>Data deletion</h2>
                If you want to request your data to be deleted please join the support server and either ask in #support or DM AEnterprise#4693 directly. We will process your request as soon as we are able to.
            </div>
        )
    }
}