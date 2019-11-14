const express = require("express")
const ideas = express.Router()
const Idea = require("../models/Idea")
const cors = require ("cors")

ideas.use(cors())
//create
ideas.post('/', (req, res) => {
    const ideaData = {
        name: req.body.name,
        description: req.body.description,
    }
    Idea.findOne({
        where: {
            name: ideaData.name
        }
    })
        .then(idea => {
            if (!idea) {
                Idea.create(ideaData)
                    .then(idea => {
                        res.status(200).json({
                            status: 'success',
                            'IdeaData': idea

                        })
                    })
                    .catch(err => {
                        res.send('error' + err)
                    })
            }
            else {
                res.send('Idea name already exists')
            }
        })
        .catch(err => {
            res.status(404).json("error: " + err)
        })
})
//get all idea
ideas.get('/', (req, res) => {
    Idea.findAll()
        .then(idea => {
            res.status(200).json({
                status: 'success',
                idea
            })
        })
        .catch(err => {
            res.status(404).json('error: ' + err)
        })
})
// read idea
ideas.post('/upvote/:ideaID', (req, res) => {


})
ideas.get('/:id', (req, res) => {


    /*Idea.findAll({
        name : req.body.name
    })
        .then((idea) => {
            if (idea) {
                return res.status(200).send({
                    success: 'true',
                    message: 'todo retrieved successfully',
                    idea,
                });
            }
            return res.status(404).send({
                success: 'false',
                message: 'todo does not exist',
            });
        });
})*/

    Idea.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(idea => {
            if (idea) {
                res.status(200).json({
                    status: 'success',
                    'ideaData': idea
                })
            }
            else {
                res.send('name does not found')
            }

        })
        .catch(err => {
            res.status(404).json('error' + err)
        })
})
// delete
ideas.delete('/:id', (req, res) => {
    Idea.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(idea => {
            if (idea) {
                res.status(200).json({
                    status: 'success',
                    message: 'data deleted'
                })
                    .catch(err => {
                        res.status(404).send('error' + err)
                    })
            }
            else {
                res.send('Idea name not found')
            }
        })
        .catch(err => {
            res.status(404).json("error: " + err)
        })
})
// update idea 
ideas.put('/:id', (req, res) => {

    Idea.update({
        name: req.body.name,
        description: req.body.description
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(idea => {
            res.status(200).json({
                status: 'success',
                message: 'data updated'
            })
        })
        .catch(err => {
            res.status(404).send('error' + err)
        })
})
module.exports = ideas


