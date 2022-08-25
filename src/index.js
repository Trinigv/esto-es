const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const Project = db.Project;
const User = db.User;
const { projects } = require('../src/JSONData/project.data.json');
const { users } = require('../src/JSONData/user.data.json');
var indexRoutes = require('./routes/index');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config({ debug: false });
const { PORT, DB_NAME, DB_HOST, DB_PASSWORD, DB_USER } = process.env;

const app = express();

var corsOptions = {
	origin: process.env.PORT || 'http://localhost:3000/',
};
app.use(cors(corsOptions));

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'API',
			version: '1.0.0',
			description: 'A simple Express Library API',
		},

		servers: [
			{
				url:
					'https://esto-es-backend.herokuapp.com/' ||
					'http://localhost:3000',
				description: 'My API Documentation',
			},
		],
	},
	apis: ['src/routes/*.js'],
};
const specs = swaggerJsDoc(options);

app.use('/', swaggerUI.serve, swaggerUI.setup(specs));

db.sequelize.sync({ force: true }).then(() => {
	app.listen(process.env.PORT || 3000, async () => {
		console.log('Server is running on port 3000');
		let check = await Project.findAll();
		if (check.length === 0) {
			await Project.bulkCreate(projects);
			await User.bulkCreate(users);
		}
	});
});

// parse requests of content-type - application/json

app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }));

//simple route
app.use('/', indexRoutes);
