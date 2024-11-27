const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const db = require('../../backend/db');

const app = express();

// Configure CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Increase payload size limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API Endpoints
app.get('/api/emails/:prefix', (req, res) => {
  try {
    const emails = db.prepare('SELECT * FROM emails WHERE emailPrefix = ? ORDER BY receivedAt DESC').all(req.params.prefix);
    res.json(emails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
});

app.post('/api/emails/:prefix', (req, res) => {
  const { from, subject, body, senderIP } = req.body;
  const emailPrefix = req.params.prefix;

  try {
    const result = db.prepare(`
      INSERT INTO emails (emailPrefix, sender, subject, body, senderIP, receivedAt)
      VALUES (?, ?, ?, ?, ?, datetime('now'))
    `).run(emailPrefix, from, subject, body, senderIP);

    const newEmail = db.prepare('SELECT * FROM emails WHERE id = ?').get(result.lastInsertRowid);
    res.json({ message: 'Email received successfully', email: newEmail });
  } catch (error) {
    console.error('Error receiving email:', error);
    res.status(500).json({ error: 'Failed to receive email' });
  }
});

app.delete('/api/emails/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM emails WHERE id = ?').run(req.params.id);
    res.json({ message: 'Email deleted successfully' });
  } catch (error) {
    console.error('Error deleting email:', error);
    res.status(500).json({ error: 'Failed to delete email' });
  }
});

// For serverless deployment
module.exports.handler = serverless(app);
