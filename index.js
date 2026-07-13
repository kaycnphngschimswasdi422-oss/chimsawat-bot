require("dotenv").config();

const fs = require("fs");
const path = require("path");

const {
    Client,
    Collection,
    GatewayIntentBits
} = require("discord.js");

require("./database");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

// โหลด Commands
const commandFiles = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.data.name, command);

}

// โหลด Events
const eventFiles = fs.readdirSync("./events").filter(f => f.endsWith(".js"));

for (const file of eventFiles) {

    require(`./events/${file}`)(client);

}

// รับ Slash Command
client.on("interactionCreate", async interaction => {

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {

        await command.execute(interaction);

    } catch (err) {

        console.error(err);

        if (!interaction.replied) {

            interaction.reply({
                content: "เกิดข้อผิดพลาด",
                ephemeral: true
            });

        }

    }

});

client.login(process.env.TOKEN);
