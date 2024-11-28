const express = require('express');
const cors = require('cors');

const app = express();
const port = 8888;

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// In-memory storage
let emails = [];

// Debug middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    console.log('Health check endpoint called');
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get emails for a prefix
app.get('/emails/:prefix', (req, res) => {
    try {
        const prefix = req.params.prefix;
        console.log('Getting emails for prefix:', prefix);
        const userEmails = emails.filter(email => email.emailPrefix === prefix);
        console.log('Found emails:', userEmails);
        res.json(userEmails);
    } catch (error) {
        console.error('Error getting emails:', error);
        res.status(500).json({ error: 'Failed to get emails' });
    }
});

// Create a new email
app.post('/emails/:prefix', (req, res) => {
    try {
        const { from, subject, body, senderIP } = req.body;
        const emailPrefix = req.params.prefix;
        
        console.log('Creating new email for prefix:', emailPrefix);
        console.log('Request body:', req.body);
        
        const newEmail = {
            id: Date.now(),
            emailPrefix,
            from,
            subject,
            body,
            senderIP,
            receivedAt: new Date().toISOString()
        };
        
        emails.push(newEmail);
        console.log('Email created:', newEmail);
        res.status(201).json(newEmail);
    } catch (error) {
        console.error('Error creating email:', error);
        res.status(500).json({ error: 'Failed to create email' });
    }
});

// Delete emails for a prefix
app.delete('/emails/:prefix', (req, res) => {
    try {
        const prefix = req.params.prefix;
        console.log('Deleting emails for prefix:', prefix);
        emails = emails.filter(email => email.emailPrefix !== prefix);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting emails:', error);
        res.status(500).json({ error: 'Failed to delete emails' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
