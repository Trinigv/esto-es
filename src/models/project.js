const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const Project = sequelize.define(
		'Project',
		{
			//sequelize creates default primary key
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
		{ timestamps: false }
	);
	return Project;
};
