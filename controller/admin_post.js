const { internalServerError, success } = require('../utils/response-util')
const adminPostService = require('../service/admin_post_service')

exports.fetchPostList = async (req, res) => {
    try {
        const pageLimit = req.query.count ?? 10
        const pageNumber = req.query.page ?? 1
        const post = await adminPostService.getPostList(pageLimit, pageNumber)
        success(req, res, post)
    } catch (e) {
        console.error(`Error fetchPostList--- ${e}`)
        internalServerError(req, res, e)
    }
}

exports.updatePostData = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        if(!id) throw (`Invalid ID`)
        const post = await adminPostService.updatePost(body, id)
        if(post <= 0) throw (`Update Failed`)
        success(req, res, post)
    } catch (e) {
        console.error(`Error updatePostData--- ${e}`)
        internalServerError(req, res, e)
    }
}

exports.createPostData = async (req, res) => {
    try {
        const body = req.body
        if (!body.title) throw (`Invalid Title`)
        if (!body.body) throw (`Invalid Body`)
        if (!body.status) throw (`Invalid Status`)
        if (!body.label) throw (`Invalid Label`)

        const post = await adminPostService.createPost(body)
        if(post <= 0) throw (`Create Failed`)
        success(req, res, post)
    } catch (e) {
        console.error(`Error createPostData--- ${e}`)
        internalServerError(req, res, e)
    }
}

exports.deletePostData = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) throw (`Invalid ID`)
        const post = await adminPostService.deletePost(id)
        if(post <= 0) throw (`Delete Failed`)
        success(req, res, post)
    } catch (e) {
        console.error(`Error deletePostData--- ${e}`)
        internalServerError(req, res, e)
    }
}