const db = require('../config/db');

exports.getUserTokenValidate = async (token) => {
    try {
        const users = await db.executeQuery(
            'SELECT * FROM users WHERE token = $1', 
            [token]);
        return users[1];
    } catch (error) {
        throw error;
    }
}

exports.getAdminUserTokenValidate = async (token) => {
    try {
        const users = await db.executeQuery(
            'SELECT * FROM admin_users WHERE token = $1', 
            [token]);
        return users[1];
    } catch (error) {
        throw error;
    }
}