const dbConfig = require('../dbConfig');

const Sequelize = require('Sequelize');

const sequelize = new Sequelize(
	dbConfig.database,
	dbConfig.user,
	dbConfig.password,
	{
		host: dbConfig.host,
		dialect: dbConfig.dialect,
		operationsAliases: false,
		pool: {
			max: dbConfig.pool.max,
			min: dbConfig.pool.min,
			acquire: dbConfig.pool.acquire,
			idle: dbConfig.pool.idle,
		},
	}
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Project = require('./project')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);
db.Project_User = require('./Project_User')(sequelize, Sequelize);

db.Project.belongsToMany(db.User, { through: 'Project_User' });
db.User.belongsToMany(db.Project, { through: 'Project_User' });

module.exports = db;
