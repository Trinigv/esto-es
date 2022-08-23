const express = require('express');
const { Router } = require('express');
const { insertUser, createUser } = require('../services/controllers/user.controllers')

const router = Router();

router.post('/create', createUser);

router.post('/insert', insertUser);


module.exports = router

