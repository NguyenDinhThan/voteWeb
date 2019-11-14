const Sequelize = require("sequelize")
const db = require("../database/db.js")
module.exports = db.sequelize.define(
    'vote',
    {
        userID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        ideaID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        vote: {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false
    }
)