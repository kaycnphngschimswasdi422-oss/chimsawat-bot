const { ActivityType } = require("discord.js");

module.exports = (client) => {

    client.once("ready", async () => {

        console.clear();

        console.log("=================================");
        console.log("🤖 Chimsawat Bot");
        console.log(`👤 Login : ${client.user.tag}`);
        console.log(`🆔 ID : ${client.user.id}`);
        console.log(`📡 Servers : ${client.guilds.cache.size}`);
        console.log("✅ Bot Online");
        console.log("=================================");

        client.user.setPresence({
            status: "online",
            activities: [
                {
                    name: "Chimsawat Server",
                    type: ActivityType.Watching
                }
            ]
        });

    });

};
