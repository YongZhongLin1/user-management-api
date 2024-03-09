const db = require('../config/db');
const { MEMBERSHIP } = require('../constant/membership')

exports.getPostList = async (pageLimit, pageNumber, status, categoryId) => {
    try {
        console.log(status)
        let queryString = 'SELECT * FROM post WHERE label IN ($3) ORDER BY id LIMIT $1 OFFSET $2';
        let queryParams = [pageLimit, (pageNumber - 1) * pageLimit, 'Normal'];
        if(status === MEMBERSHIP.PREMIUM) {
            queryParams[2] = 'Normal, Premium'
        }
        if(categoryId) {
            queryString = 'SELECT * FROM post WHERE label IN ($3) AND category_id = $4 ORDER BY id LIMIT $1 OFFSET $2';
            queryParams.push(categoryId)
        }
        const post = await db.executeQuery(
            queryString,
            queryParams);
        return post[1];
    } catch (error) {
        throw error;
    }
}

exports.getPostById = async (id, status) => {
    try {
        let queryParams = [id, 'Normal']
        if(status === MEMBERSHIP.PREMIUM) {
            queryParams[1] = 'Normal, Premium'
        }
        const post = await db.executeQuery(
            'SELECT * FROM post WHERE id = $1 AND label IN ($2)',
            queryParams);
        return post[1];
    } catch (error) {
        throw error;
    }
}