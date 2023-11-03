const express = require("express")
const { engine } = require("express-handlebars")
const app = express()
const port = 3000

const db = require('./models')
const Resto = db.restaurantlists
const methodOverride = require('method-override')

app.engine(".hbs", engine({ defaultLayout: "main.hbs" }))
app.set("view engine", ".hbs")
app.set("views", "./views")
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method')) //''內可以隨意指定 辨別使用methodOverride的方式

app.get("/", (req, res) => {
  res.redirect('/restaurants')
})

app.get("/restaurants", (req, res) => {
  Resto.findAll({
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
  })

  .then(Resto => {
  const keyword = req.query.keywords?.trim()

  const matchRestaurant = keyword ? Resto.filter(Resto => {
    const restaurantlistsData =   //重新生成物件只想取name,category
    {
      name: Resto.name,
      category: Resto.category,
    }

    //再用Object.values使物件變成數列 使用.some()數列方法辨認
    return Object.values(restaurantlistsData).some(value => {
      if (typeof (value) === 'string') {
        return value.toLowerCase().includes(keyword)
      }
      else return false
    })
  }) : Resto
  res.render('index', { Resto: matchRestaurant, keyword });
})


})

app.get('/restaurants/new', (req, res) => {
  res.render('new');
})

app.post('/restaurants', (req, res) => {
  const data = req.body
  console.log(data)
  Resto.create(data)
    .then(() => { res.redirect('/restaurants') })

})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Resto.findByPk(id, {
  attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
  raw: true
})
.then(Resto => { res.render('show', { Resto }) })

})


app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Resto.findByPk(id, {
  attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
  raw: true
})

  .then(Resto => res.render('edit', { Resto }))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  Resto.update(req.body, { where: { id } })

.then(updateResto => { res.redirect('/restaurants') })

})

app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  Resto.destroy({ where: { id } })
  .then(() => { res.redirect('/restaurants') })
})
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})