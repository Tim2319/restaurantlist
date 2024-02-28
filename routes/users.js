const express = require('express')
const router = express.Router()
const userController = require('../controllers/users-controller')
const { generalErrorHandler } = require('../middlewares/error-handler')

router.get('/register', userController.registerPage)
router.post('/register', userController.register)

router.use('/', generalErrorHandler)

module.exports = router
