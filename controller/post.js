const { internalServerError, success } = require('../utils/response-util')
const postService = require('../service/post_service')

exports.fetchPostList = async (req, res) => {
    try {
        const status = req.user.membership
        const pageLimit = req.query.count ?? 10
        const pageNumber = req.query.page ?? 1
        const category = req.query.categoryId

        const user = await postService.getPostList(pageLimit, pageNumber, status, category)
        success(req, res, user)
    } catch (e) {
        console.error(`Error fetchPostList--- ${e}`)
        internalServerError(req, res, e)
    }
}

exports.getPostById = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) throw(`Invalid Post`)
        const post = await postService.getPostById(id)
        success(req, res, post)
    } catch (e) {
        console.error(`Error getPostById--- ${e}`)
        internalServerError(req, res, e)
    }
}