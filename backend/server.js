const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const db = require('./db');

const app = express();
const httpServer = createServer(app);

// Configure CORS with specific origins
const allowedOrigins = [
  'https://gorgeous-marigold-c2c275.netlify.app',
  'http://localhost:3000',
  'http://localhost:3001'
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Configure Socket.IO with proper settings
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
    transports: ['websocket', 'polling']
  },
  pingTimeout: 60000,
  pingInterval: 25000,
  transports: ['websocket', 'polling']
});

// Increase payload size limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('subscribe', (emailPrefix) => {
    console.log('Client subscribed to:', emailPrefix);
    socket.join(emailPrefix);
  });

  socket.on('unsubscribe', (emailPrefix) => {
    console.log('Client unsubscribed from:', emailPrefix);
    socket.leave(emailPrefix);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
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

app.post('/api/receive-email', (req, res) => {
  try {
    const { to, from, subject, body } = req.body;
    const emailPrefix = to.split('@')[0];
    const senderIP = req.ip;

    const result = db.prepare(`
      INSERT INTO emails (emailPrefix, fromAddress, subject, body, receivedAt, senderIP)
      VALUES (?, ?, ?, ?, datetime('now'), ?)
    `).run(emailPrefix, from, subject, body, senderIP);

    const newEmail = db.prepare('SELECT * FROM emails WHERE id = ?').get(result.lastInsertRowid);
    
    // Emit the new email to connected clients
    io.to(emailPrefix).emit('newEmail', newEmail);

    res.json({ message: 'Email received successfully', emailId: result.lastInsertRowid });
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 5001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
