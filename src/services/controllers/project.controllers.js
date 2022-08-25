const db = require('../../models');
const Project = db.Project;
const User = db.User;
const axios = require('axios');
const { getPagination, getPagingData } = require('./pagination');
const { addUser } = require('./user.controllers');
const { Op } = require('sequelize');
const { options } = require('../../routes');

const createProject = async (req, res) => {
	let { title, description, user_id } = req.body;
	if (title.length === 0) {
		res.status(400).send('Project must have a title');
	} else {
		var newProject = await Project.create({
			title: title,
			description: description,
		});
		//should use addUser function
		let user = await User.findByPk(user_id);
		await newProject.addUser(user);
		res.status(201).send('Project created successfully');
	}
};

const findById = async (req, res) => {
	let { id } = req.params;
	let idParse = parseInt(id);
	if (typeof idParse !== 'number') {
		res.status(400).send('Id must be number');
	} else {
		let project = await Project.findOne({
			where: {
				[Op.and]: [
					{
						status: 'Available',
					},
					{
						id: id,
					},
				],
			},
		});
		if (project) {
			res.status(200).send(project);
			console.log(project);
		} else {
			res.status(404).send(
				`Could not find project with id ${id}. Please create new one`
			);
		}
	}
};

const updateProjectInfo = async (req, res) => {
	const { project_id, title, description, user_id } = req.body;
	if (title && title.length === 0) {
		res.status(400).send('Title can not be empty');
		return;
	}
	let currentProject = await Project.findOne({
		where: {
			[Op.and]: [
				{
					status: 'Available',
				},
				{
					id: project_id,
				},
			],
		},
	});
	if (currentProject) {
		await Project.update({ title: title, description: description });
		let asignee = await User.findByPk(user_id);
		if (asignee !== null) {
			await currentProject.addUser(asignee);
			res.status(200).send('User assigned successfully');
		}
	} else {
		res.status(404).send('Project not found');
		return;
	}
};

const searchByTitle = async (req, res) => {
	const { /*page, size,*/ title } = req.query;
	if (title) {
		var data = await Project.findAll({
			where: { [Op.and]: [{ deletedAt: null }, { title: title }] },
		});
		//const { limit, offset } = getPagination(page, size);
		//condition,
		//limit,
		//offset,
	}
	//const response = getPagingData(data, page, limit);
	/*if (response.totalItems === 0) {
		res.status(404).send(`Project with title ${title} not found`);
		return;
	}*/
	if (data.length !== 0) {
		res.status(200).send(data);
	} else {
		res.status(404).send(`Could not find project with name ${title}`);
	}
};

const findAllProjects = async (req, res) => {
	const { page, size } = req.query;

	const { limit, offset } = getPagination(page, size);

	var data = await Project.findAll({
		where: { status: 'Available' },
		limit,
		offset,
	});
	const response = getPagingData(data, page, limit);
	if (data.length === 0) {
		res.status(404).send('Could not find projects on this page');
	} else {
		res.status(200).send(data);
	}
};

const hideProject = async (req, res) => {
	const { id } = req.params;

	var updatedRows = await Project.update(
		{ status: 'Unavailable', deletedAt: new Date() },
		{ where: { id: id } }
	);
	res.status(200).send('Project deleted');
};

module.exports = {
	updateProjectInfo,
	createProject,
	findById,
	searchByTitle,
	hideProject,
	findAllProjects,
};
