const db = require('../config/db');

exports.getPostList = async (pageLimit, pageNumber) => {
    try {
        const post = await db.executeQuery(
            'SELECT * FROM post ORDER BY id LIMIT $1 OFFSET $2',
            [pageLimit, (pageNumber - 1) * pageLimit]);
        return post[1];
    } catch (error) {
        throw error;
    }
}

exports.createPost = async (body) => {
    try {
        const expression = [];
        const updateValue = [];

        //parse body into query string
        for (var a of Object.keys(body)) {
            expression.push(a)
            updateValue.push(body[a])
        }

        const post = await db.executeQuery(
            `INSERT INTO post (${expression.join(', ')}) VALUES (${expression.map((col, indx) => `$${indx + 1}`).join(', ')})`,
            updateValue);
        return post[0];
    } catch (error) {
        throw error;
    }
}

exports.updatePost = async (body, id) => {
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
        const post = await db.executeQuery(
            `UPDATE post SET ${expressionString.join(', ')} WHERE id = $${updateValue.length + 1}`,
            [...updateValue, parseInt(id)])
        return post[0];
    } catch (error) {
        throw error;
    }
}

exports.deletePost = async (id) => {
    try {
        const post = await db.executeQuery(
            `DELETE FROM post WHERE id = $1`,
            [parseInt(id)])
        return post[0];
    } catch (error) {
        throw error;
    }
}