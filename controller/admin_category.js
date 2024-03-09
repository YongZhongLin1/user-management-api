const { internalServerError, success } = require('../utils/response-util')
const adminCategoryService = require('../service/admin_category_service')

exports.fetchCategoryList = async (req, res) => {
    try {
        const pageLimit = req.query.count ?? 10
        const pageNumber = req.query.page ?? 1
        const category = await adminCategoryService.getCategoryList(pageLimit, pageNumber)
        success(req, res, category)
    } catch (e) {
        console.error(`Error fetchCategoryList--- ${e}`)
        internalServerError(req, res, e)
    }
}

exports.updateCategoryData = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        if(!id) throw (`Invalid ID`)
        const category = await adminCategoryService.updateCategory(body, id)
        if(category <= 0) throw (`Update Failed`)
        success(req, res, category)
    } catch (e) {
        console.error(`Error updateCategoryData--- ${e}`)
        internalServerError(req, res, e)
    }
}

exports.createCategoryData = async (req, res) => {
    try {
        const body = req.body
        if (!body.name) throw (`Invalid Name`)
        if (!body.description) throw (`Invalid Description`)
        if (body.activated == null) throw (`Invalid Activated`)

        const category = await adminCategoryService.createCategory(body)
        if(category <= 0) throw (`Create Failed`)
        success(req, res, category)
    } catch (e) {
        console.error(`Error createCategoryData--- ${e}`)
        internalServerError(req, res, e)
    }
}

exports.deleteCategoryData = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) throw (`Invalid ID`)
        const category = await adminCategoryService.deleteCategory(id)
        if(category <= 0) throw (`Delete Failed`)
        success(req, res, category)
    } catch (e) {
        console.error(`Error deleteCategoryData--- ${e}`)
        internalServerError(req, res, e)
    }
}