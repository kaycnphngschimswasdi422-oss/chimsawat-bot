require("dotenv").config();

const fs = require("fs");

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
client.invites = new Map();

// =======================
// โหลด Commands
// =======================

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.data.name, command);

}

// =======================
// โหลด Events
// =======================

const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

for (const file of eventFiles) {

    require(`./events/${file}`)(client);

}

// =======================
// Slash Commands
// =======================

client.on("interactionCreate", async (interaction) => {

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {

        await command.execute(interaction);

    } catch (err) {

        console.error(err);

        if (!interaction.replied && !interaction.deferred) {

            await interaction.reply({
                content: "❌ เกิดข้อผิดพลาด",
                ephemeral: true
            });

        }

    }

});

// =======================
// Ready
// =======================

client.once("ready", async () => {

    console.clear();

    console.log("==================================");
    console.log("🤖 Chimsawat Bot");
    console.log(`👤 Login : ${client.user.tag}`);
    console.log(`🌐 Guilds : ${client.guilds.cache.size}`);
    console.log("==================================");

    for (const guild of client.guilds.cache.values()) {

        try {

            const invites = await guild.invites.fetch();

            client.invites.set(guild.id, invites);

            console.log(`✅ Invite Loaded : ${guild.name}`);

        } catch (err) {

            console.log(`⚠️ โหลด Invite ไม่ได้ : ${guild.name}`);

        }

    }

});

// =======================
// Login
// =======================

client.login(process.env.TOKEN);
