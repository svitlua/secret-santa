const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/database');

class Santas extends Model{ }

Santas.init({
    userId: {
        type: DataTypes.STRING
    },
    santaId: {
        type: DataTypes.STRING
    },
}, {
    sequelize,
    modelName: 'santas',
    timestamps: false
})

module.exports = Santas;
