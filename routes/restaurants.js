const express = require('express')
const router = express.Router()

const db = require('../models')
const Resto = db.restaurantlists

router.get('/', (req, res) => {
  const dropdownValue = req.query.dropdownValue
  let orderOpition // 儲存order by選項

  const A = dropdownValue === 'A'
  const Z = dropdownValue === 'Z'
  const category = dropdownValue === 'category'
  const location = dropdownValue === 'location'

  switch (dropdownValue) {
    case 'A':
      orderOpition = [['name', 'ASC']] // 多一個括號原因為要讓name與ASC一起被當作條件
      break
    case 'Z':
      orderOpition = [['name', 'DESC']]
      break
    case 'category':
      orderOpition = [['category', 'ASC']]
      break
    case 'location':
      orderOpition = [['location', 'ASC']]
      break
  }
  Resto.findAll({
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    order: orderOpition,
    raw: true
  })

    .then(Resto => {
      const keyword = req.query.keywords?.trim()
      const matchRestaurant = keyword
        ? Resto.filter(Resto => {
          // 重新生成物件只想取name,category
          const restaurantlistsData =
        {
          name: Resto.name,
          category: Resto.category
        }
        // 再用Object.values使物件變成數列 使用.some()數列方法辨認
          return Object.values(restaurantlistsData).some(value => {
            if (typeof (value) === 'string') {
              return value.toLowerCase().includes(keyword)
            } else return false
          })
        })
        : Resto

      res.render('index', {
        Resto: matchRestaurant,
        keyword,
        dropdownValue,
        A,
        Z,
        category,
        location
      })
    })
})

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const data = req.body
  console.log(data)
  Resto.create(data)
    .then(() => { res.redirect('/restaurants') })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  Resto.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
  })
    .then(Resto => { res.render('show', { Resto }) })
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Resto.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
  })

    .then(Resto => res.render('edit', { Resto }))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  Resto.update(req.body, { where: { id } })

    .then(updateResto => { res.redirect('/restaurants') })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  Resto.destroy({ where: { id } })
    .then(() => { res.redirect('/restaurants') })
})

module.exports = router
