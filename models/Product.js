// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    // product name
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // category id
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: 'category',
        unique: false
      }
    },
    // price
    price: {
      type: DataTypes.DECIMAL(15, 2),
      validate: {
        isNumeric: true
      },
      allowNull: false
    },
    // stock
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

module.exports = Product;
