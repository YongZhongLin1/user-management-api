const { internalServerError, success } = require('../utils/response-util')
const adminUserService = require('../service/admin_user_service')

exports.fetchUserList = async (req, res) => {
    try {
        const pageLimit = req.query.count ?? 10
        const pageNumber = req.query.page ?? 1
        console.log(pageLimit, pageNumber)
        const user = await adminUserService.getUserList(pageLimit, pageNumber)
        success(req, res, user)
    } catch (e) {
        console.error(`Error fetchUserList--- ${e}`)
        internalServerError(req, res, e)
    }
}

exports.updateUserData = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        if(!id) throw (`Invalid ID`)
        const user = await adminUserService.updateUser(body, id)
        if(user <= 0) throw (`Update Failed`)
        success(req, res, user)
    } catch (e) {
        console.error(`Error updateUserData--- ${e}`)
        internalServerError(req, res, e)
    }
}

exports.createUserData = async (req, res) => {
    try {
        const body = req.body
        if (!body.username) throw (`Invalid Username`)
        if (!body.password) throw (`Invalid Password`)
        if (!body.email) throw (`Invalid Email`)
        if (!body.fullName) throw (`Invalid Full Name`)
        if (!body.membership) throw (`Invalid Membership`)

        const user = await adminUserService.createUser(body)
        if(user <= 0) throw (`Create Failed`)
        success(req, res, user)
    } catch (e) {
        console.error(`Error createUserData--- ${e}`)
        internalServerError(req, res, e)
    }
}

exports.deleteUserData = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) throw (`Invalid ID`)
        const user = await adminUserService.deleteUser(id)
        if(user <= 0) throw (`Delete Failed`)
        success(req, res, user)
    } catch (e) {
        console.error(`Error deleteUserData--- ${e}`)
        internalServerError(req, res, e)
    }
}