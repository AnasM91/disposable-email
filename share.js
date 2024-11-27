const { exec } = require('child_process');
const localtunnel = require('localtunnel');

console.log('Starting servers and creating sharing URLs...\n');

// Start backend server
exec('node backend/server.js', (error, stdout, stderr) => {
    if (error) {
        console.error(`Backend Error: ${error}`);
        return;
    }
});

// Start frontend server (assuming create-react-app)
exec('npm start', (error, stdout, stderr) => {
    if (error) {
        console.error(`Frontend Error: ${error}`);
        return;
    }
});

// Create tunnels after servers start
setTimeout(async () => {
    try {
        // Create tunnel for backend
        const backendTunnel = await localtunnel({ port: 5001, subdomain: 'disposable-email-backend' });
        
        // Create tunnel for frontend
        const frontendTunnel = await localtunnel({ port: 3001, subdomain: 'disposable-email-app' });

        console.log('\n=== 🌐 SHARING INFORMATION ===');
        console.log('\n📱 URL TO SHARE WITH OTHERS:');
        console.log(frontendTunnel.url);
        
        // Update environment variables
        const fs = require('fs');
        const envContent = `REACT_APP_API_URL=${backendTunnel.url}\nREACT_APP_WS_URL=${backendTunnel.url.replace('https://', 'wss://')}`;
        fs.writeFileSync('.env.share', envContent);

        console.log('\n✨ Instructions for the person you\'re sharing with:');
        console.log('1. Just open this URL in your browser:');
        console.log(`   ${frontendTunnel.url}`);
        console.log('\n2. That\'s it! No installation needed.');
        
        console.log('\n⚠️ Important Notes:');
        console.log('- The URL will work as long as your computer keeps running this script');
        console.log('- If you stop and restart the script, you\'ll get new URLs');
        console.log('- Share the new URLs with others if you restart');
        
        console.log('\n🛑 To stop sharing:');
        console.log('- Press Ctrl+C to stop the script');
        
        // Handle cleanup
        const cleanup = () => {
            console.log('\nStopping servers and closing tunnels...');
            backendTunnel.close();
            frontendTunnel.close();
            process.exit();
        };

        process.on('SIGINT', cleanup);
        process.on('SIGTERM', cleanup);

    } catch (err) {
        console.error('Error creating tunnels:', err);
        process.exit(1);
    }
}, 5000);
