const db = require('../models')
const Users = db.Users
const bcrypt = require('bcryptjs')

const userController = {
  loginPage: (req, res) => {
    res.render('login')
  },
  login: (req, res) => {
    req.flash('success', '登入成功!')
    res.redirect('/restaurant')
  },
  logout: (req, res) => {
    req.flash('success', '登出成功！')
    req.logout()
    res.redirect('/login')
  },
  registerPage: (req, res) => {
    res.render('register')
  },
  register: (req, res, next) => {
    if (req.body.password !== req.body.check_password) throw new Error('密碼不一致')

    Users.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) throw new Error('此信箱已註冊')

        return bcrypt.hash(req.body.password, 10)
      })
      .then(hash => Users.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      }))
      .then(() => {
        req.flash('success', '註冊成功!')
        res.redirect('/login')
      })
      .catch(err => next(err))
  }
}

module.exports = userController
