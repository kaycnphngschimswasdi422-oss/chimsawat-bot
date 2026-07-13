const {
    EmbedBuilder
} = require("discord.js");

const config = require("../config");

module.exports = (client) => {

    client.on("guildMemberAdd", async (member) => {

        const channel = member.guild.channels.cache.get(config.welcomeChannel);

        if (!channel) return;

        const embed = new EmbedBuilder()
            .setColor(config.colors.success)
            .setTitle("🎉 ยินดีต้อนรับ")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(
`สวัสดี ${member}

ยินดีต้อนรับเข้าสู่ **${member.guild.name}**

👥 สมาชิกปัจจุบัน
**${member.guild.memberCount} คน**

ขอให้สนุกกับเซิร์ฟเวอร์ ❤️`
            )
            .setFooter({
                text: "Chimsawat Bot"
            })
            .setTimestamp();

        channel.send({
            embeds: [embed]
        });

    });

};
