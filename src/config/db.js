const config = {
    server: 'DOTNET-1',
    database: 'DisposableEmail',
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true,
        trustedConnection: true,
        integratedSecurity: true
    }
};

module.exports = config;
