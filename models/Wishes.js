const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/database');

class Wishes extends Model{ }

Wishes.init({
    userId: {
        type: DataTypes.STRING
    },
    wish: {
        type: DataTypes.STRING
    },
}, {
    sequelize,
    modelName: 'wish',
    timestamps: false
})

module.exports = Wishes;
