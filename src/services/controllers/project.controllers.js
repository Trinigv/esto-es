const db = require('../../models');
const Project = db.Project;
const axios = require('axios');
const { getPagination, getPagingData } = require('./pagination');
const { Op } = require('sequelize');

const createProject = async (req, res) => {
	let { title, summary } = req.body;
	if (title.length === 0) {
		res.status(404).send('Project must have a title');
	} else {
		var newProject = await Project.create({
			title: title,
			summary: summary,
		});
		res.status(201).send(newProject);
	}
};

const findById = async (req, res) => {
	let { id } = req.params;
	let idParse = parseInt(id);
	if (typeof idParse !== 'number') {
		res.status(400).json({ message: 'Id must be number' });
	} else {
		let project = await Project.findByPk(id);
		if (project) {
			res.status(200).json(project);
		} else {
			res.status(404).json({
				message: `Could not find project with id ${id}. Please create new one`,
			});
		}
	}
};

const updateProjectInfo = async (req, res) => {
	const { id } = req.params;
	const { title, summary } = req.body;
	let parseId = parseInt(id);
	if (typeof parseId !== 'number') {
		res.status(400).send('Id must be a number');
		return;
	}
	if (title.length === 0) {
		res.status(400).send('Title can not be empty');
		return;
	}
	try {
		let currentProject = await Project.findByPk(id);
		if (currentProject) {
			await Project.update(
				{ title: title, summary: summary },
				{ where: { id: id } }
			);
			let updated = await Project.findByPk(id);
			res.status(200).send(updated);
		}
	} catch (err) {
		console.log(err);
	}
};

const searchByTitle = async (req, res) => {
	const { page, size, title } = req.query; //obtained by query but there are default values
	if (title) {
		var condition = {
			//[Op.and]: [
			title: { [Op.like]: `%${title}%` },
			//	{ deletedAt: { [Op.is]: null } },
			//],
		};
	}
	const { limit, offset } = getPagination(page, size);
	var data = await Project.findAndCountAll({
		where: { deletedAt: null },
		condition,
		limit,
		offset,
	});
	console.log(data);
	const response = getPagingData(data, page, limit);
	if (response.totalItems === 0) {
		res.status(404).send(`Project with title ${title} not found`);
		return;
	}
	res.status(200).send(response);
};

const hideProject = async (req, res) => {
	const { id } = req.params;
	parseId = parseInt(id);
	if (typeof parseId !== 'number') {
		res.status(404).send('Id must be a number');
	}
	let date = new Date();
	let project = await Project.update(
		{ deletedAt: date },
		{ where: { id: parseId } }
	);
	res.status(200).send('Project deleted successfully');
};

module.exports = {
	updateProjectInfo,
	createProject,
	findById,
	searchByTitle,
	hideProject,
};
