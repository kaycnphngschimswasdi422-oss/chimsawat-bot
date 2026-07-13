const Database = require("better-sqlite3");

const db = new Database("data/database.sqlite");

db.prepare(`
CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guildId TEXT,
    userId TEXT UNIQUE,
    username TEXT,
    points INTEGER DEFAULT 0,
    voiceTime INTEGER DEFAULT 0,
    invites INTEGER DEFAULT 0,
    lastDaily TEXT DEFAULT "",
    createdAt TEXT
)
`).run();

db.prepare(`
CREATE TABLE IF NOT EXISTS voice_sessions(
    userId TEXT PRIMARY KEY,
    joinTime INTEGER
)
`).run();

db.prepare(`
CREATE TABLE IF NOT EXISTS logs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guildId TEXT,
    userId TEXT,
    type TEXT,
    message TEXT,
    time TEXT
)
`).run();

module.exports = db;
