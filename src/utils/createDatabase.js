const sql = require('mssql');

const config = {
    server: 'DOTNET-1\\SQLEXPRESS',  // Added SQLEXPRESS instance name
    user: 'sa',
    password: '123456',
    options: {
        encrypt: false,  // Changed to false for local server
        trustServerCertificate: true,
        enableArithAbort: true
    }
};

async function createDatabase() {
    try {
        console.log('Connecting to SQL Server...');
        
        // Connect to master database first
        let pool = await sql.connect({
            ...config,
            database: 'master'
        });

        console.log('Connected to master database');

        // Create the database if it doesn't exist
        console.log('Creating DisposableEmail database...');
        await pool.request().query(`
            IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'DisposableEmail')
            BEGIN
                CREATE DATABASE DisposableEmail;
            END
        `);

        console.log('Database created or already exists');

        // Close the connection to master
        await pool.close();

        // Connect to our new database
        console.log('Connecting to DisposableEmail database...');
        pool = await sql.connect({
            ...config,
            database: 'DisposableEmail'
        });

        console.log('Creating Emails table...');
        // Create the Emails table if it doesn't exist
        await pool.request().query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Emails')
            BEGIN
                CREATE TABLE Emails (
                    Id INT IDENTITY(1,1) PRIMARY KEY,
                    EmailPrefix NVARCHAR(255) NOT NULL,
                    FromAddress NVARCHAR(255) NOT NULL,
                    Subject NVARCHAR(255),
                    Body NVARCHAR(MAX),
                    ReceivedAt DATETIME2 DEFAULT GETDATE(),
                    SenderIP NVARCHAR(50)
                );

                CREATE INDEX IX_Emails_EmailPrefix ON Emails(EmailPrefix);
                CREATE INDEX IX_Emails_ReceivedAt ON Emails(ReceivedAt);
            END
        `);

        console.log('Database and table created successfully!');
        await pool.close();
        process.exit(0);
    } catch (err) {
        console.error('Error creating database:', err);
        process.exit(1);
    }
}

createDatabase();
