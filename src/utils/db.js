const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../../disposable-emails.db'));

function initializeDatabase() {
  console.log('Initializing database...');
  db.exec(`DROP TABLE IF EXISTS Emails`);
  db.exec(`
    CREATE TABLE IF NOT EXISTS Emails (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      emailPrefix TEXT,
      fromAddress TEXT,
      subject TEXT,
      body TEXT,
      receivedAt INTEGER,
      senderIP TEXT
    )
  `);
  console.log('Database initialized');
}

async function getEmailsByPrefix(prefix) {
  console.log('Fetching emails for prefix:', prefix);
  try {
    const stmt = db.prepare(`
      SELECT 
        id,
        emailPrefix,
        fromAddress,
        subject,
        body,
        receivedAt,
        senderIP
      FROM Emails 
      WHERE emailPrefix = ? 
      ORDER BY receivedAt DESC
    `);
    const results = stmt.all(prefix);
    console.log('Found emails:', results);
    return results;
  } catch (error) {
    console.error('Error fetching emails:', error);
    throw error;
  }
}

async function insertEmail(emailData) {
  console.log('Inserting email:', emailData);
  try {
    const stmt = db.prepare(`
      INSERT INTO Emails (emailPrefix, fromAddress, subject, body, senderIP, receivedAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      emailData.emailPrefix,
      emailData.fromAddress,
      emailData.subject,
      emailData.body,
      emailData.senderIP,
      Date.now() // Store current timestamp in milliseconds
    );
    console.log('Email inserted:', result);
    return result;
  } catch (error) {
    console.error('Error inserting email:', error);
    throw error;
  }
}

async function deleteEmail(id) {
  console.log('Deleting email:', id);
  try {
    const stmt = db.prepare('DELETE FROM Emails WHERE id = ?');
    const result = stmt.run(id);
    console.log('Email deleted:', result);
    return result;
  } catch (error) {
    console.error('Error deleting email:', error);
    throw error;
  }
}

module.exports = {
  initializeDatabase,
  getEmailsByPrefix,
  insertEmail,
  deleteEmail
};
