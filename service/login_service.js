const db = require('../config/db');

exports.validateUserLogin = async(username, password) => {
    try {
        const user = await db.executeQuery(
            'SELECT * FROM users WHERE username = $1 AND password = $2', 
            [username, password]);
        return user[1];
    } catch (error) {
        throw error;
    }
}

exports.validateAdminUserLogin = async(username, password) => {
    try {
        const user = await db.executeQuery(
            'SELECT * FROM admin_users WHERE username = $1 AND password = $2', 
            [username, password]);
        return user[1];
    } catch (error) {
        throw error;
    }
}

exports.updateUserToken = async(token, id) => {
    try {
        const user = await db.executeQuery(
            `UPDATE users SET token = $1 WHERE id = $2`,
            [token, id])
        return user[0];
    } catch (error) {
        throw error;
    }
}

exports.updateAdminUserToken = async(token, id) => {
    try {
        const user = await db.executeQuery(
            `UPDATE admin_users SET token = $1 WHERE id = $2`,
            [token, id])
        return user[0];
    } catch (error) {
        throw error;
    }
}