// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Products extends Model {}

// set up fields and rules for Product model
Products.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: 'category',
        unique: false
      }
    },
    price: {
      type: DataTypes.DECIMAL(15, 2),
      validate: {
        isNumeric: true
      },
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true
      },
      allowNull: false,
      defaultValue: 20
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Products;
