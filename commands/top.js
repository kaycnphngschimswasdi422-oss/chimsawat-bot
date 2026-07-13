const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const db = require("../database");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("top")
        .setDescription("อันดับเวลาออนไลน์"),

    async execute(interaction) {

        const users = db.prepare(`
            SELECT username, voiceTime
            FROM users
            ORDER BY voiceTime DESC
            LIMIT 10
        `).all();

        if (users.length === 0) {

            return interaction.reply({
                content: "❌ ยังไม่มีข้อมูลเวลาออนไลน์",
                ephemeral: true
            });

        }

        let text = "";

        users.forEach((user, index) => {

            const h = Math.floor(user.voiceTime / 3600);
            const m = Math.floor((user.voiceTime % 3600) / 60);

            let medal = "🏅";

            if (index === 0) medal = "🥇";
            if (index === 1) medal = "🥈";
            if (index === 2) medal = "🥉";

            text += `${medal} **${user.username}**\n`;
            text += `⏰ ${h} ชั่วโมง ${m} นาที\n\n`;

        });

        const embed = new EmbedBuilder()
            .setColor(0x111111)
            .setTitle("🏆 TOP ONLINE")
            .setDescription(text)
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });

    }

};
