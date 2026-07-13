const {
    SlashCommandBuilder
} = require("discord.js");

const db = require("../database");

module.exports = {

    data: new SlashCommandBuilder()

        .setName("redeem")
        .setDescription("แลกยศ")

        .addStringOption(option =>
            option
                .setName("ชื่อ")
                .setDescription("ชื่อสินค้า")
                .setRequired(true)
        ),

    async execute(interaction) {

        const name = interaction.options.getString("ชื่อ");

        const item = db.prepare(
            "SELECT * FROM shop WHERE name=?"
        ).get(name);

        if (!item)
            return interaction.reply({
                content: "❌ ไม่พบสินค้า",
                ephemeral: true
            });

        const user = db.prepare(
            "SELECT * FROM users WHERE userId=?"
        ).get(interaction.user.id);

        if (!user || user.points < item.price) {

            return interaction.reply({
                content: "❌ แต้มไม่พอ",
                ephemeral: true
            });

        }

        const role = interaction.guild.roles.cache.get(item.roleId);

        if (!role) {

            return interaction.reply({
                content: "❌ ไม่พบยศ",
                ephemeral: true
            });

        }

        await interaction.member.roles.add(role);

        db.prepare(
            "UPDATE users SET points=points-? WHERE userId=?"
        ).run(
            item.price,
            interaction.user.id
        );

        interaction.reply({
            content: `✅ แลก **${item.name}** สำเร็จ`
        });

    }

};
