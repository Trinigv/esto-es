require('dotenv').config({ debug: true });
const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD } = process.env;

module.exports = {
	host: DB_HOST,
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME,
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};
