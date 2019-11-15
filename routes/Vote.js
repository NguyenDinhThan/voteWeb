const Sequelize = require("sequelize")
const express = require("express")
const votes = express.Router()
const Vote = require("../models/Vote")
const User = require("../models/User")
const Users = require("../routes/User")
//const Idea = require("../models/Idea")


//get vote list


votes.get('/', (req, res) => {
    Vote.findAll()
        .then(vote => {
            res.status(200).json({
                status: 'success',
                vote,
            })
        })
        .catch(err => {
            res.status(404).json('error: ' + err)
        })
})
votes.post('/', (req, res) => {
    Vote.findOne({
        where: {
            userID: req.body.userID,
            ideaID: req.body.ideaID
        }
    })
        .then(vote => {
            if (!vote) {
                if (req.body.upvote == 1) {
                    Vote.create({
                        userID: req.body.userID,
                        ideaID: req.body.ideaID,
                        vote_count: + 1

                    })
                    res.status(200).json({
                        status: 'data created',
                    })
                }
                if (req.body.downvote == -1) {
                    Vote.create({
                        userID: req.body.userID,
                        ideaID: req.body.ideaID,
                        disvote_count: + 1
                    })
                    res.status(200).json({
                        status: 'data created',
                    })
                }
            }
            else {
                res.status(400).send("this ID already created")
            }
        })
})
votes.get('/upvote/:ideaID', (req, res) => {
    Vote.findAll({
        where:
        {
            ideaID: req.params.ideaID
        },
        attributes: ['ideaID', [Sequelize.fn('sum', Sequelize.col('vote')), 'totalVote']],
        group: ['vote.ideaID'],
        raw: true
    })


        .then(vote => {
            res.status(200).json({
                status: "OK",
                vote
            })

        })
})

votes.get('/downvote/:ideaID', (req, res) => {
    Vote.findAll({
        where:
        {
            ideaID: req.params.ideaID
        },
        attributes: ['ideaID', [Sequelize.fn('sum', Sequelize.col('disvote_count')), 'totalDisvote']],
        group: ['vote.ideaID'],
        raw: true
    })

        .then(vote => {
            res.status(200).json({
                status: "OK",
                vote
            })

        })
})



/*votes.post('/', (req, res) => {
    const upvote = 0
    const down = 0
    const voteData = {
        userID: req.body.userID,
        ideaID: req.body.ideaID,
        up: req.body.up
    }
    Vote.findOne({
        where: {
            ideaID: req.body.ideaID
        }
    })
        .then(vote => {
            if (!vote) {
                if ((req.body.upvote == 1) && (req.body.downvote == -1)) {
                    res.status(404).json({
                        status: 'Failed',
                        message: 'only up or down value'
                    })
                }
                else if (req.body.upvote == 1) {
                    if (req.body.ideaID == Vote.ideaID) {
                        up = up + 1
                    }
                    Vote.create(voteData)
                        .then(vote => {
                            res.status(200).json({
                                status: 'OK',
                                voteData,
                                up: up
                            })
                        })
                }
                else if (req.body.downvote == -1) {
                    Vote.create(voteData)
                        .then(vote => {
                            res.status(200).json({
                                status: 'OK',
                                voteData,
                                down: down + 1,
                            })


                        })
                }
            }
            else if (vote) {
                if (vote.up == 1) {
                    if (req.body.up == 1) {
                        res.status(400).json({
                            status: ' Failed',
                            message: 'cant choose one node  twice'
                        })

                    }
                    else if (req.body.down == -1) {
                        res.status(200).json({
                            status: "OK",
                            vote,
                            count_up: upvote - 1,
                            count_down: downvote + 1
                        })
                    }
                }
                else if (vote.down == -1) {
                    if (req.body.down == -1) {
                        res.status(400).json({
                            status: ' Failed',
                            message: 'cant do one down twice'
                        })
                    }
                    else if (req.body.up == 1) {
                        res.status(200).json({
                            status: "OK",
                            vote,
                            count_up: upvote + 1,
                            count_down: downvote - 1
                        })
                    }
                }

            }
        })
        .catch(err => {
            res.status(404).json("error: " + err)
        })
})*/



votes.put('/:userID/:ideaID', (req, res) => {
    voteData = {
        up: req.body.up,
        down: req.body.down
    }
    Vote.findOne({
        where: {
            userID: req.params.userID,
            ideaID: req.params.ideaID
        }
    })
        .then(vote => {
            if (vote.up == req.body.up) {
                res.status(404).send('cant choose one node twice')
            }

        })
        .catch(err => {
            res.status(404).status('error' + err)
        })
})

votes.post('/upvote/:ideaID', (req, res) => {
    
})

module.exports = votes

/*if (vote.up == 1) {
    if (req.body.up == 1) {
        res.status(400).json({
            status: ' Failed',
            message: 'cant choose one up twice'
        })

    }
    else if (req.body.down == -1) {
        res.status(200).json({
            status: "OK",
            vote,
            count_up: upvote - 1,
            count_down: downvote + 1
        })
    }
}
else if (vote.down == -1) {
    if (req.body.down == -1) {
        res.status(400).json({
            status: ' Failed',
            message: 'cant do one down twice'
        })
    }
    else if (req.body.up == 1) {
        res.status(200).json({
            status: "OK",
            vote,
            count_up: upvote + 1,
            count_down: downvote - 1
        })
    }
}*/