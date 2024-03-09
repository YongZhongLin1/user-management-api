const db = require('../config/db');

exports.getPaymentList = async (pageLimit, pageNumber) => {
    try {
        const payment = await db.executeQuery(
            'SELECT * FROM payment ORDER BY id LIMIT $1 OFFSET $2',
            [pageLimit, (pageNumber - 1) * pageLimit]);
        return payment[1];
    } catch (error) {
        throw error;
    }
}