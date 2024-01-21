const express = require('express')
const router = express.Router()
const sitterController = require('../controllers/sitterController')
const authSitterMiddleware = require('../middlewares/authSitterMiddleware')

router.post('/register',sitterController.sitterRegister)
router.post('/sitter-login',sitterController.sitterLogin)
router.post('/getSitterData',authSitterMiddleware,sitterController.authSitterController)
router.get('/getAllSitter',sitterController.getAllSitter)
router.get('/getSitter/:id',sitterController.getSitter)
module.exports = router