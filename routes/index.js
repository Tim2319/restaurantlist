const express = require('express')
const router = express.Router()

const restaurants = require('./restaurants')
const users = require('./users')

router.use('/restaurants', restaurants)
router.use('/users', users)

router.get('/', (req, res) => {
  res.redirect('/users/login')
})

module.exports = router
