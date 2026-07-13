require("dotenv").config();

const fs = require("fs");
const path = require("path");

const {
    Client,
    GatewayIntentBits,
    Collection
} = require("discord.js");

require("./database");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

const eventsPath = path.join(__dirname, "events");

if (fs.existsSync(eventsPath)) {
    const files = fs.readdirSync(eventsPath);

    for (const file of files) {
        const event = require(`./events/${file}`);
        event(client);
    }
}

client.login(process.env.TOKEN);
