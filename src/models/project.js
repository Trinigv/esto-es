const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const Project = sequelize.define(
		'Project',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
			},
			status: {
				type: DataTypes.ENUM('Available', 'Unavailable'),
				defaultValue: 'Available',
			},
			deletedAt: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{ timestamps: false },
		{ initialAutoIncrement: 1 }
	);
	return Project;
};
