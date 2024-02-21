'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class restaurantlist extends Model {
    static associate (models) {
      // define association here
    }
  }
  restaurantlist.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      name_en: {
        type: DataTypes.STRING
      },
      category: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.TEXT
      },
      location: {
        type: DataTypes.TEXT
      },
      phone: {
        type: DataTypes.STRING
      },
      google_map: {
        type: DataTypes.TEXT
      },
      rating: {
        type: DataTypes.FLOAT.UNSIGNED
      },
      description: {
        type: DataTypes.TEXT
      }
    }, {
      sequelize,
      modelName: 'restaurantlist',
      tableName: 'restaurantlists'
    })
  return restaurantlist
}
