const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const db = require("../database");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("shop")
        .setDescription("ดูร้านค้า"),

    async execute(interaction) {

        const items = db.prepare(
            "SELECT * FROM shop ORDER BY price ASC"
        ).all();

        if (items.length === 0) {

            return interaction.reply({
                content: "🛒 ร้านค้ายังไม่มีสินค้า"
            });

        }

        let text = "";

        items.forEach(item => {

            text += `🎖️ **${item.name}**\n`;
            text += `💰 ${item.price} แต้ม\n`;

            if (item.description)
                text += `${item.description}\n`;

            text += "\n";

        });

        const embed = new EmbedBuilder()
            .setColor(0x111111)
            .setTitle("🛒 ร้านค้า")
            .setDescription(text);

        interaction.reply({
            embeds: [embed]
        });

    }

};
