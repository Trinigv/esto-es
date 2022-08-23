const sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const db = require('./index');
const Project = db.Project;
const User = db.User;

module.exports = (sequelize, Sequelize) => {
	const Project_User = sequelize.define(
		'Project_User',
		{
			//sequelize creates default primary key
		},
		{ timestamps: false }
	);
	return Project_User;
};
