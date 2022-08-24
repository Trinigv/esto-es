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

/**
 * @swagger
 * /project/edit:
 *   post:
 *     summary: Edit a project's title, description and asignees.
 *     tags: [POSTS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: The project was successfully edited
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Client Error
 */
router.post('/edit', updateProjectInfo);

/**
 * @swagger
 * /project/create:
 *   post:
 *     summary: Create a new project and set asignees.
 *     tags: [POSTS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: The project was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Client Error
 */

router.post('/create', createProject);

/**
 * @swagger
 * /project/search:
 *   get:
 *     summary: Search projects by title in query.
 *     tags: [GETS]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: Example... Project1. Not case sensitive.
 *     responses:
 *       200:
 *         description:  Project returned.
 *       404:
 *         description: Project not found.
 */

router.get('/search', searchByTitle);

/**
 * @swagger
 * /project/{id}:
 *   get:
 *     summary: Returns single project.
 *     tags: [GETS]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: project id from 1 onwards
 *     responses:
 *       200:
 *         description:  Project returned.
 */

router.get('/:id', findById);

/**
 * @swagger
 * /project/{id}:
 *   delete:
 *     summary: Hides one project.
 *     tags: [DELETE]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Project ID from 1 onwards
 *     responses:
 *       200:
 *         description: Project deleted.
 */

router.delete('/:id', hideProject);

//SCHEMA

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - project_id:
 *         - user_id
 *         - title
 *         - description
 *       properties:
 *         project_id:
 *          type: integer
 *          description: only necessary on edit route
 *         user_id:
 *           type: integer
 *           description: id of user
 *         title:
 *           type: string
 *           description: title of project
 *         description:
 *           type: string
 *           descripton: description of project *
 *       example:
 *         project_id:
 *         user_id: 1
 *         title: my project
 *         description: short summary of project
 *
 */

module.exports = router;