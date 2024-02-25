const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport')

const router = require('./routes')
const methodOverride = require('method-override')
const messageHandler = require('./middlewares/message-handler')
const errorHandler = require('./middlewares/error-handler')

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method')) // ''內可以隨意指定 辨別使用methodOverride的方式

app.use(session({ secret: 'ThisIsSecret', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(messageHandler)

app.use(router)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
