const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const db = require("../database");

const REWARD = 200;

module.exports = {

    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("รับแต้มรายวัน"),

    async execute(interaction) {

        let user = db.prepare(
            "SELECT * FROM users WHERE userId=?"
        ).get(interaction.user.id);

        if (!user) {

            db.prepare(
                "INSERT INTO users (guildId,userId,username,createdAt) VALUES (?,?,?,?)"
            ).run(
                interaction.guild.id,
                interaction.user.id,
                interaction.user.tag,
                new Date().toISOString()
            );

            user = db.prepare(
                "SELECT * FROM users WHERE userId=?"
            ).get(interaction.user.id);

        }

        const now = Date.now();

        if (user.lastDaily && now - Number(user.lastDaily) < 86400000) {

            return interaction.reply({
                content: "❌ คุณรับ Daily วันนี้ไปแล้ว",
                ephemeral: true
            });

        }

        db.prepare(
            "UPDATE users SET points=points+?, lastDaily=? WHERE userId=?"
        ).run(
            REWARD,
            now,
            interaction.user.id
        );

        const embed = new EmbedBuilder()
            .setColor(0x00c853)
            .setTitle("🎁 Daily Reward")
            .setDescription(`ได้รับ **${REWARD} แต้ม** แล้ว`)
            .setTimestamp();

        interaction.reply({
            embeds: [embed]
        });

    }

};
