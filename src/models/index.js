const dbConfig = require('../dbConfig');

const Sequelize = require('sequelize');

const s = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
	host: dbConfig.host,
	dialect: dbConfig.dialect,
	operationsAliases: false,
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = s;

db.Project = require('./project')(s, Sequelize);
db.User = require('./user')(s, Sequelize);
db.Project_User = require('./Project_User')(s, Sequelize);

db.Project.belongsToMany(db.User, { through: 'Project_User' });
db.User.belongsToMany(db.Project, { through: 'Project_User' });

module.exports = db;
