const axios = require('axios');

const API_URL = 'https://disposable-emails.netlify.app/.netlify/functions/api';
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
            subject: `Test Email with Image - ${new Date().toLocaleString()}`,
            body: `
                <div style="font-family: Arial, sans-serif;">
                    <h2>Test Email with Image</h2>
                    <p>This is a test email sent to your production deployment at ${new Date().toLocaleString()}</p>
                    <img src="https://picsum.photos/300/200" alt="Random Image">
                    <p>If you can see this email and the image above, your deployment is working correctly!</p>
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
        if (error.response) {
            console.error('Error details:', error.response.data);
        }
    }
}

runTest();
