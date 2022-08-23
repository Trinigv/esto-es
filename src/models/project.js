const { DataTypes } = require('sequelize'); 

module.exports = (sequelize, Sequelize) => {
 const Project =  sequelize.define('Project', { //sequelize creates default primary key
        title: {
        type: DataTypes.STRING,
        allowNull: false
        },
        summary: {
            type: DataTypes.TEXT
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {timestamps: false});
    return Project
}