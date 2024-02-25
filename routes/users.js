const express = require('express')
const router = express.Router()
const userController = require('../controllers/users-controller')
const passport = require('../config/passport')

router.get('/login', userController.loginPage)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.login)
router.get('/logout', userController.logout)

router.get('/register', userController.registerPage)
router.post('/register', userController.register)

module.exports = router
