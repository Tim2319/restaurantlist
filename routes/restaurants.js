const express = require('express')
const router = express.Router()

const restaurantController = require('../controllers/restaurants-controller')

router.get('/', restaurantController.getRestaurants)
router.get('/new', restaurantController.createRestaurant)
router.post('/', restaurantController.postRestaurant)
router.get('/:id', restaurantController.getRestaurant)
router.get('/:id/edit', restaurantController.editRestaurant)
router.put('/:id', restaurantController.putRestaurant)
router.delete('/:id', restaurantController.deleteRestaurant)

module.exports = router
