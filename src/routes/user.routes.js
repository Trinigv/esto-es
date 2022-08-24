const express = require('express');
const { Router } = require('express');
const {
	createUser,
	addUser,
} = require('../services/controllers/user.controllers');

const router = Router();

router.post('/create', createUser);

module.exports = router;
