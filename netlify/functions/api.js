const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const { emails } = require('./smtp-handler');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Base path for all routes
const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
    console.log('Health check endpoint called');
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get emails for a prefix
router.get('/emails/:prefix', (req, res) => {
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

// Create a new email (for testing)
router.post('/emails/:prefix', (req, res) => {
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
router.delete('/emails/:prefix', (req, res) => {
    try {
        const prefix = req.params.prefix;
        console.log('Deleting emails for prefix:', prefix);
        const index = emails.findIndex(email => email.emailPrefix === prefix);
        if (index !== -1) {
            emails.splice(index, 1);
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting emails:', error);
        res.status(500).json({ error: 'Failed to delete emails' });
    }
});

// Handle root path
router.get('/', (req, res) => {
    res.json({ message: 'API is running' });
});

// Use the router with the base path
app.use('/.netlify/functions/api', router);

// Export the serverless app
module.exports = app;
module.exports.handler = serverless(app);
