var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var app = express()
var port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

var Users = require("./routes/User")
app.use("/users", Users)
var Ideas = require("./routes/Idea")
app.use("/ideas",Ideas)
var Votes = require("./routes/Vote")
app.use("/votes",Votes)
app.listen(port, function (){
    console.log("Server is running on port" + port)
})