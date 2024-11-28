const SMTPServer = require('smtp-server').SMTPServer;
const simpleParser = require('mailparser').simpleParser;

// In-memory email storage (shared with API)
let emails = [];

const server = new SMTPServer({
    secure: false,
    authOptional: true,
    disabledCommands: ['STARTTLS'],
    onData(stream, session, callback) {
        let buffer = '';
        stream.on('data', (chunk) => {
            buffer += chunk;
        });
        
        stream.on('end', async () => {
            try {
                // Parse the email
                const parsed = await simpleParser(buffer);
                
                // Extract the recipient's email prefix
                const to = parsed.to.text;
                const emailPrefix = to.split('@')[0];
                
                // Create email object
                const newEmail = {
                    id: Date.now(),
                    emailPrefix,
                    from: parsed.from.text,
                    subject: parsed.subject,
                    body: parsed.html || parsed.text,
                    senderIP: session.remoteAddress,
                    receivedAt: new Date().toISOString()
                };
                
                // Store the email
                emails.push(newEmail);
                console.log('Received email:', newEmail);
                
                callback();
            } catch (err) {
                console.error('Error processing email:', err);
                callback(new Error('Error processing email'));
            }
        });
    },
    onMailFrom(address, session, callback) {
        callback();
    },
    onRcptTo(address, session, callback) {
        // Verify the email is for our domain
        if (!address.address.endsWith('@disposable.mail')) {
            return callback(new Error('Invalid domain'));
        }
        callback();
    }
});

// Export the emails array to share with API
module.exports = {
    emails,
    startSMTPServer: () => {
        server.listen(25);
        console.log('SMTP Server running on port 25');
    }
};
