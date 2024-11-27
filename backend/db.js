const Database = require('better-sqlite3');
const path = require('path');

// Create a new database connection
const db = new Database(path.join(__dirname, 'disposable-emails.db'));

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS emails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    emailPrefix TEXT NOT NULL,
    fromAddress TEXT NOT NULL,
    subject TEXT,
    body TEXT,
    receivedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    senderIP TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_emailPrefix ON emails(emailPrefix);
`);

module.exports = db;
