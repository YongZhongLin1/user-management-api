const db = require('../config/db');

exports.getCategoryList = async (pageLimit, pageNumber) => {
    try {
        const category = await db.executeQuery(
            'SELECT * FROM category WHERE activated = true ORDER BY id LIMIT $1 OFFSET $2', 
            [pageLimit, (pageNumber - 1) * pageLimit]);
        return category[1];
    } catch (error) {
        throw error;
    }
}

exports.getCategoryById = async (id) => {
    try {
        const category = await db.executeQuery(
            'SELECT * FROM category WHERE activated = true AND id = $1', 
            [id]);
        return category[1];
    } catch (error) {
        throw error;
    }
}