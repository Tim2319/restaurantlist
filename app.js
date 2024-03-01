const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

require('dotenv').config()

const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport')

const router = require('./routes')
const methodOverride = require('method-override')
const { getUser } = require('./middlewares/message-handler')

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method')) // ''內可以隨意指定 辨別使用methodOverride的方式

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success')
  res.locals.error_msg = req.flash('error')
  res.locals.user = getUser(req)
  next()
})

app.use(router)

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
