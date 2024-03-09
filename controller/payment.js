const { internalServerError, success } = require('../utils/response-util')
const fetch = require('node-fetch')
const paymentService = require('../service/payment_service')

exports.createPaymentUrl = async (req, res) => {
    try {
        const data = {
            collection_id: process.env.BILLPLZ_COLLECTION,
            description: req.user.fullName,
            email: req.user.email,
            name: req.user.username,
            amount: "200",
            reference_1_label: "",
            reference_1: "",
            callback_url: `http://${process.env.HOST}/arrivo/api/v1/payment/callback`
        };

        const username = process.env.BILLPLZ_SECRET_KEY;

        fetch('https://www.billplz-sandbox.com/api/v3/bills', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(`${username}:`).toString('base64')}`
            }
        })
            .then(response => {
                console.log(response)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return success(req, res, response.json());
            })
            .then(data => {
                console.log('Response:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } catch (e) {
        console.error(`Error createPaymentUrl--- ${e}`)
        internalServerError(req, res, e)
    }
}

exports.paymentCallBack = async (req, res) => {
    try {
        const body = req.body
        const payment = await paymentService.createPaymentData(body)
        if(body.paid === 'true') {
            await paymentService.updateUserPremium(body.name)
        }
        success(req, res, payment)
    } catch (e) {
        console.error(`Error paymentCallBack--- ${e}`)
        internalServerError(req, res, e)
    }
}