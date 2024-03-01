const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const userController = require('../controllers/users-controller')
const { generalErrorHandler } = require('../middlewares/error-handler')
const authenticate = require('../middlewares/auth-handler')

const restaurants = require('./restaurants')
const users = require('./users')

router.use('/restaurants', authenticate, restaurants)
router.use('/users', users)

router.get('/login', userController.loginPage)
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), userController.login)
router.get('/logout', userController.logout)

router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }))

router.get('/oauth2/redirect/facebook', passport.authenticate('facebook', {
  successRedirect: '/restaurants',
  failureRedirect: '/login',
  failureFlash: true
}))

router.use('/', (req, res) => { res.redirect('/restaurants') })
router.use('/', generalErrorHandler)

module.exports = router
