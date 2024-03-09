const authService = require('../service/auth_service');
const jwt = require('jsonwebtoken')
const { unauthorized } = require('../utils/response-util');


exports.verifyAdminToken = async (req, res, next) => {
    const token = req.headers['authorization']
    if(typeof token === 'undefined') return unauthorized(req, res, `Missing Authentication Token`)
    
    const checkingValidation = await authService.getAdminUserTokenValidate(token)
    if(checkingValidation.length <= 0) return unauthorized(req, res, `Invalid Authentication Token`)

    jwt.verify(token, process.env.JWT_TOKEN, (err, authData) => {
        if(err) return unauthorized(req, res, err)
        req.user = checkingValidation[0]
        next()
    })}

exports.verifyToken = async (req, res, next) => {
    const token = req.headers['authorization']
    if(typeof token === 'undefined') return unauthorized(req, res, `Missing Authentication Token`)
    
    const checkingValidation = await authService.getUserTokenValidate(token)
    if(checkingValidation.length <= 0) return unauthorized(req, res, `Invalid Authentication Token`)

    jwt.verify(token, process.env.JWT_TOKEN, (err, authData) => {
        if(err) return unauthorized(req, res, err)
        req.user = checkingValidation[0]
        next()
    })
}