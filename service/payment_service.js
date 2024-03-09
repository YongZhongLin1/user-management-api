const db = require('../config/db');

exports.createPaymentData = async (body) => {
    try {
        const post = await db.executeQuery(
            'INSERT INTO payment (payment_id, amount, payment_method, status) VALUES($1, $2, $3, $4)',
            [body.id, body.amount, body.collection_id, body.transaction_status]);
        return post[1];
    } catch (error) {
        throw error;
    }
}

exports.updateUserPremium = async (username) => {
    try {
        const post = await db.executeQuery(
            'UPDATE users SET membership=Premium WHERE username=$1',
            [username]);
        return post[1];
    } catch (error) {
        throw error;
    }
}