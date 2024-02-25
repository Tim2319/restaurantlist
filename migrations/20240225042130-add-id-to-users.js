'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'id', {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    })
    await queryInterface.addColumn('Users', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE
    })
    await queryInterface.addColumn('Users', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'id')
    await queryInterface.removeColumn('Users', 'createdAt')
    await queryInterface.removeColumn('Users', 'updatedAt')
  }
}
