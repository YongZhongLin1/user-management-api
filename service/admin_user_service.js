const db = require('../config/db');

exports.getUserList = async (pageLimit, pageNumber) => {
    try {
        const users = await db.executeQuery('SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2', [pageLimit, (pageNumber - 1) * pageLimit]);
        return users[1];
    } catch (error) {
        throw error;
    }
}

exports.createUser = async (body) => {
    try {
        const users = await db.executeQuery(
            'INSERT INTO users (username, email, password, fullName, membership) VALUES ($1, $2, $3, $4, $5)',
            [body.username, body.email, body.password, body.fullName, body.membership]);
        return users[0];
    } catch (error) {
        throw error;
    }
}

exports.updateUser = async (body, id) => {
    try {
        const expression = [];
        const updateValue = [];

        //adding last update time, and parse new changes as query string
        body.updated_at = new Date()
        for (var a of Object.keys(body)) {
            expression.push(a)
            updateValue.push(body[a])
        }

        //parse query string into parameterized queries
        const expressionString = expression.map((col, idx) => `${col} = $${idx + 1}`)
        const users = await db.executeQuery(
            `UPDATE users SET ${expressionString.join(', ')} WHERE id = $${updateValue.length + 1}`,
            [...updateValue, parseInt(id)])
        return users[0];
    } catch (error) {
        throw error;
    }
}

exports.deleteUser = async (id) => {
    try {
        const users = await db.executeQuery(
            `DELETE FROM users WHERE id = $1`,
            [parseInt(id)])
        return users[0];
    } catch (error) {
        throw error;
    }
}