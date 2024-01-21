const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/login',userController.userLogin)
router.post('/register',userController.userRegister)
router.post('/getUserData',authMiddleware,userController.authController)
router.post('/sendEmail',userController.sendEmail)
router.post('/bookSitter',userController.bookSitter)
router.post('/payment/:id',userController.payment)
router.post('/sendPasswordEmail',userController.chnagePasswordEmail)
router.post('/changePassword',userController.chnagePassword)
module.exports = router