const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Member = sequelize.define('Member', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'members',
    timestamps: false,

});

module.exports = Member;