const authService = require('../service/auth_service')
const loginService = require('../service/login_service')
const jwt = require('jsonwebtoken')
const { success, internalServerError, unauthorized } = require('../utils/response-util')

exports.adminLogin = async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password

        if (!username) throw ('Invalid Username')
        if (!password) throw ('Invalid Password')

        const user = await loginService.validateAdminUserLogin(username, password)
        if (!user || user.length <= 0) throw ('Invalid Username/Password')

        jwt.sign({ user: user[0].username, userId: user[0].id }, process.env.JWT_TOKEN, { expiresIn: '1h' }, async (err, token) => {
            if (err) return internalServerError(req, res, `Error generating token: ${err}`)
            await loginService.updateAdminUserToken(token, user[0].id)
            const result = await loginService.updateAdminUserToken(token, user[0].id)
            if (result <= 0) return internalServerError(req, res, 'Failed Update Token')
            success(req, res, token)
        });

    } catch (e) {
        console.error(`Error adminLogin--- ${e}`)
        internalServerError(req, res, e)
    }
}

exports.userLogin = async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password

        if (!username) throw ('Invalid Username')
        if (!password) throw ('Invalid Password')

        const user = await loginService.validateUserLogin(username, password)
        if (!user || user.length <= 0) throw ('Invalid Username/Password')

        jwt.sign({ user: user[0].username, userId: user[0].id }, process.env.JWT_TOKEN, { expiresIn: '1h' }, async (err, token) => {
            if (err) return internalServerError(req, res, `Error generating token: ${err}`)
            const result = await loginService.updateUserToken(token, user[0].id)
            if (result <= 0) return internalServerError(req, res, 'Failed Update Token')
            success(req, res, token)
        });

    } catch (e) {
        console.error(`Error userLogin--- ${e}`)
        internalServerError(req, res, e)
    }
}

exports.refreshAdminToken = async (req, res) => {
    try {
        const token = req.headers['authorization']
        if(typeof token === 'undefined') return unauthorized(req, res, `Missing Authentication Token`)
        
        const checkingValidation = await authService.getAdminUserTokenValidate(token)
        if(checkingValidation.length <= 0) return unauthorized(req, res, `Invalid Authentication Token`)

        const user = checkingValidation[0]

        jwt.sign({ user: user.username, userId: user.id }, process.env.JWT_TOKEN, { expiresIn: '1h' }, async (err, token) => {
            if (err) return internalServerError(req, res, `Error generating token: ${err}`)
            const result = await loginService.updateAdminUserToken(token, user.id)
            if (result <= 0) return internalServerError(req, res, 'Failed Update Token')
            success(req, res, token)
        });

    } catch (e) {
        console.error(`Error adminLogin--- ${e}`)
        internalServerError(req, res, e)
    }
}

exports.refreshUserToken = async (req, res) => {
    try {
        const token = req.headers['authorization']
        if(typeof token === 'undefined') return unauthorized(req, res, `Missing Authentication Token`)
        
        const checkingValidation = await authService.getUserTokenValidate(token)
        if(checkingValidation.length <= 0) return unauthorized(req, res, `Invalid Authentication Token`)
        
        const user = checkingValidation[0]

        jwt.sign({ user: user.username, userId: user.id }, process.env.JWT_TOKEN, { expiresIn: '1h' }, async (err, token) => {
            if (err) return internalServerError(req, res, `Error generating token: ${err}`)
            const result = await loginService.updateUserToken(token, user.id)
            if (result <= 0) return internalServerError(req, res, 'Failed Update Token')
            success(req, res, token)
        });

    } catch (e) {
        console.error(`Error userLogin--- ${e}`)
        internalServerError(req, res, e)
    }
}