const db = require('../models')
const restaurant = db.restaurant

const restaurantController = {
  getRestaurants: (req, res) => {
    restaurant.count().then(totalrestaurants => { // 先計算出餐廳有多少然後得出總頁數
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

      return restaurant.findAll({
        attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
        offset: (page - 1) * 9,
        limit: 9,
        order: orderOpition,
        raw: true
      })

        .then(restaurant => {
          const keyword = req.query.keywords?.trim()
          const matchRestaurant = keyword
            ? restaurant.filter(restaurant => {
            // 重新生成物件只想取name,category
              const restaurantsData =
            {
              name: restaurant.name,
              category: restaurant.category
            }
            // 再用Object.values使物件變成數列 使用.some()數列方法辨認
              return Object.values(restaurantsData).some(value => {
                if (typeof (value) === 'string') {
                  return value.toLowerCase().includes(keyword)
                } else return false
              })
            })
            : restaurant

          res.render('index', {
            restaurant: matchRestaurant,
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
  },
  createRestaurant: (req, res) => {
    res.render('new')
  },
  postRestaurant: (req, res, next) => {
    const data = req.body
    console.log(data)
    return restaurant.create(data)

      .then(() => {
        req.flash('success', '新增成功!')
        res.redirect('/restaurants')
      })

      .catch(error => {
        error.errorMessage = '新增失敗:('
        next(error)
      })
  },
  getRestaurant: (req, res) => {
    const id = req.params.id
    restaurant.findByPk(id, {
      attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
      raw: true
    })
      .then(restaurant => {
        if (!restaurant) {
          req.flash('error', '找不到資料')
          return res.redirect('/restaurants')
        }
        res.render('show', { restaurant })
      })
  },
  editRestaurant: (req, res) => {
    const id = req.params.id
    restaurant.findByPk(id, {
      attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
      raw: true
    })

      .then(restaurant => res.render('edit', { restaurant }))
  },
  putRestaurant: (req, res, next) => {
    const id = req.params.id
    restaurant.update(req.body, { where: { id } })

      .then(updateRestaurant => {
        req.flash('success', '更新成功!')
        res.redirect('/restaurants')
      })
      .catch(error => {
        error.errorMessage = '編輯失敗'
        next(error)
      })
  },
  deleteRestaurant: (req, res, next) => {
    const id = req.params.id
    restaurant.destroy({ where: { id } })
      .then(() => {
        req.flash('success', '刪除成功')
        res.redirect('/restaurants')
      })
      .catch(error => next(error))
  }
}
module.exports = restaurantController
