const Database = require("better-sqlite3");

const db = new Database("database.db");

db.prepare(`
CREATE TABLE IF NOT EXISTS users (
    userId TEXT PRIMARY KEY,
    username TEXT,
    voiceTime INTEGER DEFAULT 0,
    points INTEGER DEFAULT 0
)
`).run();

module.exports = db;
