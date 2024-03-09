const { internalServerError, success } = require('../utils/response-util')
const categoryService = require('../service/category_service')

exports.fetchCategoryList = async (req, res) => {
    try {
        const pageLimit = req.query.count ?? 10
        const pageNumber = req.query.page ?? 1
        const user = await categoryService.getCategoryList(pageLimit, pageNumber)
        success(req, res, user)
    } catch (e) {
        console.error(`Error fetchCategoryList--- ${e}`)
        internalServerError(req, res, e)
    }
}

exports.getCategoryById = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) throw(`Invalid Category`)

        const user = await categoryService.getCategoryById(id)
        success(req, res, user)
    } catch (e) {
        console.error(`Error getCategoryById--- ${e}`)
        internalServerError(req, res, e)
    }
}