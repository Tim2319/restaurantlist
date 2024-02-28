const db = require('../models')
const Users = db.User
const bcrypt = require('bcryptjs')

const userController = {
  loginPage: (req, res) => {
    res.render('login')
  },
  login: (req, res) => {
    req.flash('success', '登入成功!')
    res.redirect('/restaurants')
  },
  logout: (req, res) => {
    req.logout(() => {
      req.flash('success', '登出成功！')
      res.redirect('/login')
    })
  },
  registerPage: (req, res) => {
    res.render('register')
  },
  register: (req, res, next) => {
    if (req.body.password !== req.body.check_password) throw new Error('密碼不一致')

    Users.findOne({ where: { Email: req.body.email } })
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
      .catch(error => next(error))
  }
}

module.exports = userController
