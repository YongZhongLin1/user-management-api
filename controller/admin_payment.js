const { internalServerError, success } = require('../utils/response-util')
const adminPaymentService = require('../service/admin_payment_service')

exports.fetchPaymentList = async (req, res) => {
    try {
        const pageLimit = req.query.count ?? 10
        const pageNumber = req.query.page ?? 1
        const payment = await adminPaymentService.getPaymentList(pageLimit, pageNumber)
        success(req, res, payment)
    } catch (e) {
        console.error(`Error fetchPaymentList--- ${e}`)
        internalServerError(req, res, e)
    }
}