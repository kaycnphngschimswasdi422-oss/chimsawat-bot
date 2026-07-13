const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const db = require("../database");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("profile")
        .setDescription("ดูโปรไฟล์ของคุณ"),

    async execute(interaction) {

        let user = db.prepare(`
            SELECT *
            FROM users
            WHERE userId = ?
        `).get(interaction.user.id);

        if (!user) {

            db.prepare(`
                INSERT INTO users
                (guildId,userId,username,createdAt)
                VALUES (?,?,?,?)
            `).run(
                interaction.guild.id,
                interaction.user.id,
                interaction.user.tag,
                new Date().toISOString()
            );

            user = db.prepare(`
                SELECT *
                FROM users
                WHERE userId = ?
            `).get(interaction.user.id);

        }

        const h = Math.floor(user.voiceTime / 3600);
        const m = Math.floor((user.voiceTime % 3600) / 60);

        const embed = new EmbedBuilder()
            .setColor(0x111111)
            .setAuthor({
                name: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL()
            })
            .setThumbnail(interaction.user.displayAvatarURL())

            .addFields(
                {
                    name: "⏰ เวลาออนไลน์",
                    value: `${h} ชั่วโมง ${m} นาที`,
                    inline: true
                },
                {
                    name: "💰 แต้ม",
                    value: `${user.points}`,
                    inline: true
                },
                {
                    name: "📩 จำนวน Invite",
                    value: `${user.invites}`,
                    inline: true
                }
            )

            .setFooter({
                text: "Chimsawat Bot"
            })

            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });

    }

};
