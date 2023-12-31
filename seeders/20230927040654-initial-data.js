'use strict'

const json = require('../public/jsons/restaurant.json').results

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      const restaurants = json.map((restaurant) => ({
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
        createdAt: new Date(),
        updatedAt: new Date()
      }))

      await queryInterface.bulkInsert('restaurantlists', restaurants, {})
    } catch (error) {
      console.error('Error:', error)
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('restaurantlists', null)
  }
}
