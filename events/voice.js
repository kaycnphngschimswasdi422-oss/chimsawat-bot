const db = require("../database");

module.exports = (client) => {

    client.on("voiceStateUpdate", (oldState, newState) => {

        const member = newState.member || oldState.member;
        if (!member || member.user.bot) return;

        // เข้า Voice
        if (!oldState.channelId && newState.channelId) {

            db.prepare(`
                INSERT OR REPLACE INTO voice_sessions
                (userId, joinTime)
                VALUES (?, ?)
            `).run(
                member.id,
                Date.now()
            );

            return;
        }

        // ออกจาก Voice
        if (oldState.channelId && !newState.channelId) {

            const session = db.prepare(`
                SELECT * FROM voice_sessions
                WHERE userId = ?
            `).get(member.id);

            if (!session) return;

            const seconds = Math.floor(
                (Date.now() - session.joinTime) / 1000
            );

            db.prepare(`
                INSERT OR IGNORE INTO users
                (guildId,userId,username,createdAt)
                VALUES (?,?,?,?)
            `).run(
                member.guild.id,
                member.id,
                member.user.tag,
                new Date().toISOString()
            );

            db.prepare(`
                UPDATE users
                SET
                voiceTime = voiceTime + ?,
                username = ?
                WHERE userId = ?
            `).run(
                seconds,
                member.user.tag,
                member.id
            );

            db.prepare(`
                DELETE FROM voice_sessions
                WHERE userId = ?
            `).run(member.id);

        }

    });

};
