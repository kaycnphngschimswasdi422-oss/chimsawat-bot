require("dotenv").config();

module.exports = {
    token: process.env.TOKEN,
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID,

    welcomeChannel: process.env.WELCOME_CHANNEL_ID,
    logChannel: process.env.LOG_CHANNEL_ID,

    dailyReward: 200,

    colors: {
        primary: 0x111111,
        success: 0x00c853,
        error: 0xd50000,
        warning: 0xffab00
    }
};
