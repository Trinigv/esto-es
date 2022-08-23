const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const Project = db.Project;
const User = db.User;
const { projects } = require('../src/JSON Data/project.data.json');
const { users } = require('../src/JSON Data/user.data.json');
var indexRoutes = require('./routes/index');

const app = express();

var corsOptions = {
	origin: 'http://localhost:3000/',
};
app.use(cors(corsOptions));

db.sequelize.sync({ force: true }).then(() => {
	app.listen(3000, async () => {
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

// set port, listen for requests
