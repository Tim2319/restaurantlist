'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class restaurantlists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  restaurantlists.init(
    {
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    name_en: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
	  image: {
      type: DataTypes.TEXT,
    },
	  location: {
      type: DataTypes.TEXT,
    },
	  phone: {
      type: DataTypes.STRING,
    },
	  google_map: {
      type: DataTypes.TEXT,
    },
	  rating: {
      type: DataTypes.FLOAT.UNSIGNED,
    },
	  description:{
      type: DataTypes.TEXT,
    }
  }, {
    sequelize,
    modelName: 'restaurantlists',
  });
  return restaurantlists;
};