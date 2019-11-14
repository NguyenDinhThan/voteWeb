const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/User")

users.use(cors())


process.env.SECRET_KEY = 'secret'
//register
users.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        first_name: req.body.first_name,
        last_name : req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        created: today
    }
    User.findOne({
        where: {
            email: userData.email
        }
    })
        .then(user => {
            if (!user) {
                const hash = bcrypt.hashSync(userData.password, 10)
                userData.password = hash
                User.create(userData)
                    .then(user => {
                        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1440
                        })
                        res.status(200).json({
                            status: 'OK',
                            user
                        })

                    })

                    .catch(err => {
                        res.send('error' + err)
                    })
            } else {
                res.send("User already exists")
            }
        })
        .catch(err => {
            res.status(404).json("error: " + err)
        })
})

//login
users.post('/login', (req, res) => {
    
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.status(200).json({
                    status: 'OK',
                    message: 'User login successully',
                    token : token
                    
                })
                // res.json({ token: token })
            } else {
                res.send("User dose not exist")
            }
        })
        .catch(err => {
            res.status(404).json("error: " + err)
        })
})

//profile
users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    User.findOne({
        where: {
            id: decoded.id
        }
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send('User does not exist')

            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

module.exports = users

