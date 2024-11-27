const { exec } = require('child_process');

// Find and kill processes using our ports
const ports = ['3001', '5001'];

ports.forEach(port => {
    exec(`netstat -ano | findstr :${port}`, (error, stdout, stderr) => {
        if (stdout) {
            const lines = stdout.split('\n');
            lines.forEach(line => {
                const parts = line.trim().split(/\s+/);
                if (parts.length > 4) {
                    const pid = parts[4];
                    console.log(`Killing process ${pid} on port ${port}`);
                    exec(`taskkill /F /PID ${pid}`, (err) => {
                        if (err) {
                            console.log(`Could not kill process ${pid}: ${err.message}`);
                        } else {
                            console.log(`Successfully killed process ${pid}`);
                        }
                    });
                }
            });
        }
    });
});
