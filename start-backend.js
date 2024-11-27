const { exec } = require('child_process');
const localtunnel = require('localtunnel');

// Start backend server
exec('node backend/server.js', async (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error}`);
        return;
    }
    console.log(stdout);
    console.error(stderr);
});

// Create tunnel after a short delay
setTimeout(async () => {
    try {
        const tunnel = await localtunnel({ port: 5001 });
        console.log('\n=== Backend Public URL ===');
        console.log(tunnel.url);
        
        console.log('\n=== Instructions ===');
        console.log('1. Your backend is now accessible from anywhere!');
        console.log('2. Use this URL in your frontend configuration');
        console.log('Note: URL will change if you restart the application\n');

        tunnel.on('close', () => {
            console.log('Tunnel closed');
            process.exit();
        });
    } catch (err) {
        console.error('Error creating tunnel:', err);
        process.exit(1);
    }
}, 2000);
