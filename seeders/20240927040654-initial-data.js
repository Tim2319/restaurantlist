'use strict'

const json = require('../public/jsons/restaurant.json').results

json.forEach(data => {
  if (data.id <= 3) data.userId = 1
  else if (data.id <= 6) data.userId = 2
})
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      const restaurants = json.map(restaurant => ({
        id: restaurant.id,
        name: restaurant.name,
        name_en: restaurant.name_en,
        category: restaurant.category,
        image: restaurant.image,
        location: restaurant.location,
        phone: restaurant.phone,
        google_map: restaurant.google_map,
        rating: restaurant.rating,
        description: restaurant.description,
        userId: restaurant.userId,
        createdAt: new Date(),
        updatedAt: new Date()
      }))

      await queryInterface.bulkInsert('restaurants', restaurants)
    } catch (error) {
      console.error('Error', error)
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('restaurants', null)
  }
}
