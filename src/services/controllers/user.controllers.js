const db = require('../../models');
const User = db.User;
const Project = db.Project;
const axios = require('axios');

const addUser = async (project_id, user_id, res) => {
	let activeUser = await User.findByPk(user_id);
	let activeProject = await Project.findByPk(project_id);
	if (activeProject === null && activeUser === null) {
		res.status(404).send('Info is incorrect');
	} else if (activeProject === null) {
		res.status(404).send(
			'Project does not exist! Please select another one'
		);
	} else if (activeUser === null) {
		res.status(404).send('User does not exist!');
	} else {
		await activeProject.addUser(activeUser);
		let projectUsers = await Project.findOne({
			where: { id: project_id },
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

module.exports = { addUser, createUser };
