'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('restaurantlists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name_en: {
        type: Sequelize.STRING
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      location: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      google_map: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      rating: {
        allowNull: false,
        type: Sequelize.DECIMAL(2, 1)
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('restaurantlists')
  }
}
