const express = require('express')
const router = express.Router()

const db = require('../models')
const Resto = db.restaurantlists

router.get('/', (req, res) => {
  Resto.count().then(totalrestaurants => { // 先計算出餐廳有多少然後得出總頁數
    const renderRestaurant = 9
    const totalRestaurantsPage = Math.ceil(totalrestaurants / renderRestaurant)

    const page = parseInt(req.query.page) || 1 // 未傳入時為1
    const hasNextPage = page < totalRestaurantsPage
    const hasPrepage = (page - 1) > 0

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

    return Resto.findAll({
      attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
      offset: (page - 1) * 9,
      limit: 9,
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
          Previous: page > 1 ? page - 1 : page,
          Next: page + 1,
          page,
          hasPrepage,
          hasNextPage,
          dropdownValue,
          A,
          Z,
          category,
          location
        })
      })
  })
})

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res, next) => {
  const data = req.body

  return Resto.create(data)
    .then(() => {
      req.flash('success', '新增成功!')
      res.redirect('/restaurants')
    })
    .catch(error => {
      error.errorMessage = '新增失敗:('
      next(error)
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  Resto.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
  })
    .then(Resto => {
      if (!Resto) {
        req.flash('error', '找不到資料')
        return res.redirect('/restaurants')
      }
      res.render('show', { Resto })
    })
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Resto.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
  })

    .then(Resto => res.render('edit', { Resto }))
})

router.put('/:id', (req, res, next) => {
  const id = req.params.id
  Resto.update(req.body, { where: { id } })

    .then(updateResto => {
      req.flash('success', '更新成功!')
      res.redirect('/restaurants')
    })
    .catch(error => {
      error.errorMessage = '編輯失敗'
      next(error)
    })
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Resto.destroy({ where: { id } })
    .then(() => {
      req.flash('success', '刪除成功')
      res.redirect('/restaurants')
    })
    .catch(error => {
      error.errorMessage = '刪除失敗'
      next(error)
    })
})

module.exports = router
