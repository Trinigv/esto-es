const express = require('express');
const { Router } = require('express');
const {
	updateProjectInfo,
	createProject,
	findById,
	searchByTitle,
	hideProject,
} = require('../services/controllers/project.controllers');

const router = Router();

router.put('/update/:id', updateProjectInfo);

router.post('/create', createProject);

router.get('/searchProject', searchByTitle);

router.get('/:id', findById);

router.delete('/:id', hideProject);

module.exports = router;
