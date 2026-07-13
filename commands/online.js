const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const db = require("../database");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("online")
        .setDescription("ดูเวลาออนไลน์ในห้องเสียง"),

    async execute(interaction) {

        const user = db.prepare(
            "SELECT * FROM users WHERE userId = ?"
        ).get(interaction.user.id);

        let seconds = 0;

        if (user)
            seconds = user.voiceTime;

        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        const embed = new EmbedBuilder()
            .setColor(0x111111)
            .setTitle("⏰ เวลาออนไลน์")
            .setThumbnail(interaction.user.displayAvatarURL())
            .setDescription(
                `**${interaction.user.username}**\n\n` +
                `🕒 ${h} ชั่วโมง ${m} นาที ${s} วินาที`
            )
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });

    }
};
