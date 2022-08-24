const sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define(
		'User',
		{
			//sequelize creates default primary key
			username: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ timestamps: false }
	);
	return User;
};
