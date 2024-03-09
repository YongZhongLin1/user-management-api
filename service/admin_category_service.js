const db = require('../config/db');

exports.getCategoryList = async (pageLimit, pageNumber) => {
    try {
        const category = await db.executeQuery(
            'SELECT * FROM category ORDER BY id LIMIT $1 OFFSET $2', 
            [pageLimit, (pageNumber - 1) * pageLimit]);
        return category[1];
    } catch (error) {
        throw error;
    }
}

exports.createCategory = async (body) => {
    try {
        const category = await db.executeQuery(
            'INSERT INTO category (name, description, activated) VALUES ($1, $2, $3)',
            [body.name, body.description, body.activated]);
        return category[0];
    } catch (error) {
        throw error;
    }
}

exports.updateCategory = async (body, id) => {
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
        const category = await db.executeQuery(
            `UPDATE category SET ${expressionString.join(', ')} WHERE id = $${updateValue.length + 1}`,
            [...updateValue, parseInt(id)])
        return category[0];
    } catch (error) {
        throw error;
    }
}

exports.deleteCategory = async (id) => {
    try {
        const category = await db.executeQuery(
            `DELETE FROM category WHERE id = $1`,
            [parseInt(id)])
        return category[0];
    } catch (error) {
        throw error;
    }
}