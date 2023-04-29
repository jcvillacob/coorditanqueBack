const config = {
    user: 'jcvillacobz', // Reemplaza esto con el nuevo nombre de usuario
    password: 'Jucaviza123', // Reemplaza esto con la nueva contraseña
    server: 'JUANCAMILO', // El nombre del servidor
    database: 'Coorditanques', // Reemplaza esto con el nombre de tu base de datos
    options: {
        encrypt: false, // Cambiar a true si te conectas a una instancia de Azure
        trustServerCertificate: true, // Cambiar a false si se usa un certificado válido
        instanceName: '', // Reemplaza esto con el nombre de la instancia de SQL Server, si es necesario
    },
};

module.exports = config;
