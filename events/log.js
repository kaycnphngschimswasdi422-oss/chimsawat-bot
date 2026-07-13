const { EmbedBuilder } = require("discord.js");
const config = require("../config");

module.exports = (client) => {

    // สมาชิกเข้าเซิร์ฟเวอร์
    client.on("guildMemberAdd", async (member) => {

        const channel = member.guild.channels.cache.get(config.logChannel);
        if (!channel) return;

        const embed = new EmbedBuilder()
            .setColor(config.colors.success)
            .setTitle("📥 MEMBER JOIN")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                {
                    name: "👤 ผู้ใช้",
                    value: `${member.user.tag}`,
                    inline: true
                },
                {
                    name: "🆔 User ID",
                    value: member.id,
                    inline: true
                },
                {
                    name: "👥 สมาชิกทั้งหมด",
                    value: `${member.guild.memberCount}`,
                    inline: true
                }
            )
            .setFooter({
                text: "Chimsawat Log"
            })
            .setTimestamp();

        channel.send({
            embeds: [embed]
        });

    });

    // สมาชิกออกเซิร์ฟเวอร์
    client.on("guildMemberRemove", async (member) => {

        const channel = member.guild.channels.cache.get(config.logChannel);
        if (!channel) return;

        const embed = new EmbedBuilder()
            .setColor(config.colors.error)
            .setTitle("📤 MEMBER LEFT")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                {
                    name: "👤 ผู้ใช้",
                    value: `${member.user.tag}`,
                    inline: true
                },
                {
                    name: "🆔 User ID",
                    value: member.id,
                    inline: true
                },
                {
                    name: "👥 สมาชิกคงเหลือ",
                    value: `${member.guild.memberCount}`,
                    inline: true
                }
            )
            .setFooter({
                text: "Chimsawat Log"
            })
            .setTimestamp();

        channel.send({
            embeds: [embed]
        });

    });

};
