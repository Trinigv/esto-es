const db = require('../../models');
const User = db.User;
const Project = db.Project;
const axios = require('axios');

const insertUser = async (req, res) => {
	let { username, title } = req.body;

	let activeUser = await User.findOne({ where: { username: username } });
	let activeProject = await Project.findOne({
		where: {
			title: title,
		},
	});
	if (activeProject === null && activeUser === null) {
		res.status(404).send('Info is incorrect');
	} else if (activeProject === null) {
		res.status(404).json({
			message: 'Project does not exist! Please select another one',
		});
	} else if (activeUser === null) {
		res.status(404).json({ message: 'User does not exist!' });
	} else {
		await activeProject.addUser(activeUser);
		let projectUsers = await Project.findOne({
			where: {
				title: title,
			},
			include: [{ model: User, through: { attributes: [] } }],
		});
		res.status(200).send(projectUsers);
	}
};

const createUser = async (req, res) => {
	let { username } = req.body;
	if (username.length === 0) {
		res.send('Username can not be empty');
	}
	var newUser = await User.create({ username: username });
	res.status(201).json(newUser);
};

module.exports = { insertUser, createUser };
