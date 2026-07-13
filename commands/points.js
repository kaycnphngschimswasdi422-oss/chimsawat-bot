const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const db = require("../database");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("points")
        .setDescription("ดูแต้มสะสมของคุณ"),

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

        const embed = new EmbedBuilder()
            .setColor(0x111111)
            .setTitle("💰 แต้มสะสม")
            .setDescription(`คุณมี **${user.points}** แต้ม`)
            .setTimestamp();

        interaction.reply({
            embeds: [embed]
        });

    }
};
