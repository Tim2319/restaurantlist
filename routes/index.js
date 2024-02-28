const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const userController = require('../controllers/users-controller')
const { generalErrorHandler } = require('../middlewares/error-handler')

const restaurants = require('./restaurants')
const users = require('./users')

router.get('/login', userController.loginPage)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.login)
router.get('/logout', userController.logout)

router.use('/restaurants', restaurants)
router.use('/users', users)

router.use('/', (req, res) => { res.redirect('/restaurants') })
router.use('/', generalErrorHandler)

module.exports = router
