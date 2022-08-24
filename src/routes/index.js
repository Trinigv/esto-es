const express = require('express');
const { Router } = require('express');
const axios = require('axios');
const db = require('../models');
const projectRoutes = require('./project.routes');
const userRoutes = require('./user.routes');

const router = Router();

router.use('/project', projectRoutes);

router.use('/user', userRoutes);

module.exports = router;
