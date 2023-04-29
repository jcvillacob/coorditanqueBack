const sql = require('mssql');
const db = require('../../../config/db');
const bcrypt = require('bcrypt');

// CREATE (INSERT)
async function createUser(user) {
    try {
        // Encripta la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        let pool = await sql.connect(db);
        let result = await pool.request()
            .input('nombre', sql.NVarChar, user.nombre)
            .input('email', sql.NVarChar, user.email)
            .input('password', sql.NVarChar, hashedPassword)
            .query('INSERT INTO Users (nombre, email, password) VALUES (@nombre, @email, @password)');
        return result;
    } catch (err) {
        console.error(err);
    }
}

// READ (SELECT)
async function getUsers() {
    try {
        let pool = await sql.connect(db);
        let result = await pool.request().query('SELECT * FROM Users');
        return result.recordset;
    } catch (err) {
        console.error(err);
    }
}

// READ BY ID (SELECT)
async function getUserById(id) {
    try {
        let pool = await sql.connect(db);
        let result = await pool.request()
            .input('id', sql.UniqueIdentifier, id)
            .query('SELECT * FROM Users WHERE id = @id');
        return result.recordset[0];
    } catch (err) {
        console.error(err);
    }
}


// UPDATE
async function updateUser(id, user) {
    try {
        let pool = await sql.connect(db);
        let result = await pool.request()
            .input('id', sql.UniqueIdentifier, id)
            .input('nombre', sql.NVarChar, user.nombre)
            .input('email', sql.NVarChar, user.email)
            .query('UPDATE Users SET nombre = @nombre, email = @email WHERE id = @id');
        return result;
    } catch (err) {
        console.error(err);
    }
}

// DELETE
async function deleteUser(id) {
    try {
        let pool = await sql.connect(db);
        let result = await pool.request()
            .input('id', sql.UniqueIdentifier, id)
            .query('DELETE FROM Users WHERE id = @id');
        return result;
    } catch (err) {
        console.error(err);
    }
}

async function createUsersTableIfNotExists() {
    try {
        let pool = await sql.connect(db);
        await pool.request().query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
            CREATE TABLE Users (
                id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
                nombre NVARCHAR(255) NOT NULL,
                email NVARCHAR(255) NOT NULL UNIQUE,
                password NVARCHAR(255) NOT NULL
            )
        `);
    } catch (err) {
        console.error('Error al crear la tabla Users:', err);
    }
}



module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    createUsersTableIfNotExists,
    getUserById,
};
