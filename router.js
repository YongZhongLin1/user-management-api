const express = require('express')
const authController = require('./controller/auth')
const adminUserController = require('./controller/admin_user')
const loginController = require('./controller/login')
const adminCategoryController = require('./controller/admin_category')
const adminPostController = require('./controller/admin_post')
const adminPaymentController = require('./controller/admin_payment')
const postController = require('./controller/post')
const categoryController = require('./controller/category')
const paymentController = require('./controller/payment')
const verifyToken = authController.verifyToken
const verifyAdminToken = authController.verifyAdminToken

module.exports = function (app) {
    const apiRoutes = express.Router()

    apiRoutes.get('/', (_, res) => { res.send('Hello World') })

    //Admin Panel
    //Login API
    apiRoutes.post('/admin/v1/login', loginController.adminLogin)
    apiRoutes.post('/admin/v1/token/refresh', loginController.refreshAdminToken)

    //User API
    apiRoutes.get('/admin/v1/user', verifyAdminToken, adminUserController.fetchUserList)
    apiRoutes.post('/admin/v1/user', verifyAdminToken, adminUserController.createUserData)
    apiRoutes.put('/admin/v1/user/:id', verifyAdminToken, adminUserController.updateUserData)
    apiRoutes.delete('/admin/v1/user/:id', verifyAdminToken, adminUserController.deleteUserData)

    //Post API
    apiRoutes.get('/admin/v1/post', verifyAdminToken, adminPostController.fetchPostList)
    apiRoutes.post('/admin/v1/post', verifyAdminToken, adminPostController.createPostData)
    apiRoutes.put('/admin/v1/post/:id', verifyAdminToken, adminPostController.updatePostData)
    apiRoutes.delete('/admin/v1/post/:id', verifyAdminToken, adminPostController.deletePostData)

    //Category API
    apiRoutes.get('/admin/v1/category', verifyAdminToken, adminCategoryController.fetchCategoryList)
    apiRoutes.post('/admin/v1/category', verifyAdminToken, adminCategoryController.createCategoryData)
    apiRoutes.put('/admin/v1/category/:id', verifyAdminToken, adminCategoryController.updateCategoryData)
    apiRoutes.delete('/admin/v1/category/:id', verifyAdminToken, adminCategoryController.deleteCategoryData)

    //Payment API
    apiRoutes.get('/admin/v1/payment', verifyAdminToken, adminPaymentController.fetchPaymentList)

    //User API
    //Login API
    apiRoutes.post('/v1/login', loginController.userLogin)
    apiRoutes.post('/v1/token/refresh', loginController.refreshUserToken)

    //Post API
    apiRoutes.get('/v1/post', verifyToken, postController.fetchPostList)
    apiRoutes.get('/v1/post/:id', verifyToken, postController.getPostById)

    //Category API
    apiRoutes.get('/v1/category', verifyToken, categoryController.fetchCategoryList)
    apiRoutes.get('/v1/category/:id', verifyToken, categoryController.getCategoryById)

    //Payment API
    apiRoutes.post('/v1/payment', verifyToken, paymentController.createPaymentUrl)
    apiRoutes.post('/v1/payment/callback', paymentController.paymentCallBack)

    app.use('/arrivo/api', apiRoutes)
}