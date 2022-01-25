const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Wishes = require('./Wishes');

class User extends Model{ }

User.init({
    firstname: {
        type: DataTypes.STRING
    },
    lastname: {
        type: DataTypes.STRING
    },
}, {
    sequelize,
    modelName: 'user',
    timestamps: false
})

User.hasMany(Wishes, { foreignKey: 'userId' });
Wishes.belongsTo(User);


module.exports = User;
