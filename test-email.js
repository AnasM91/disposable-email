const axios = require('axios');

const API_URL = 'http://localhost:8888';
const TEST_EMAIL_PREFIX = 'test123';

async function runTest() {
    console.log('Starting API test...\n');

    try {
        // 1. Test health endpoint
        console.log('1. Testing health endpoint...');
        const healthResponse = await axios.get(`${API_URL}/health`);
        console.log('Health check response:', healthResponse.data);
        console.log('\n');

        // 2. Send test email with image
        console.log('2. Sending test email...');
        const testEmail = {
            from: 'test@example.com',
            subject: `Test Email with Image`,
            body: `
                <div style="font-family: Arial, sans-serif;">
                    <h2>Test Email with Image</h2>
                    <p>This is a test email with an embedded image.</p>
                    <img src="https://picsum.photos/300/200" alt="Random Image">
                </div>
            `,
            senderIP: '127.0.0.1'
        };

        const emailResponse = await axios.post(
            `${API_URL}/emails/${TEST_EMAIL_PREFIX}`,
            testEmail
        );
        
        console.log('Email sent successfully!');
        console.log('\n');

    } catch (error) {
        console.error('Test failed:', error.message);
    }
}

runTest();
