const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

const router = require('./routes')
const methodOverride = require('method-override')

app.engine('.hbs', engine({ defaultLayout: 'main.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method')) // ''內可以隨意指定 辨別使用methodOverride的方式

app.use(router)

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
