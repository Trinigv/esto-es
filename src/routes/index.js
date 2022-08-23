const express = require('express')
const { Router } = require('express'); 
const axios = require('axios')
const db = require('../models');
const projectRoutes = require('./project.routes')
const userRoutes = require('./user.routes')

const router = Router(); 

router.use('/project', projectRoutes);

router.use('/user', userRoutes); 

/*router.get('/search', async(req, res) => {
    let { input } = req.query; 
    if(input) {
        let result = await Project.findAll({
            where: { title: { [Op.substring]: [input] } }

        })
        if (result.length === 0) { 
            res.status(404).send(`Could not find project with name ${input}`) 
            return 
        } else {
            res.status(200).send(result)
        } 
    }
})*/





 module.exports = router
