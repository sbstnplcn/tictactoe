'use strict'
// Set up ======================================================================
let http = require('http')
let express = require('express')
let app = exports.app = express()
let bodyParser = require('body-parser')
let methodOverride = require('method-override')
let morgan = require('morgan')
let routes = require('./app/routes')
let cors = require('cors')
const ENV = require('./config/env')
const port = process.env.PORT || 9000

app.use(express.static(__dirname + '/public'))

// app.use(cors())

app.use(morgan('combined'))

app.use(bodyParser.urlencoded({
    'extended': 'true'
}))
app.use(bodyParser.json())
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}))

app.use(methodOverride('X-HTTP-Method-Override'))

let server = http.Server(app)
let io = require('socket.io')(server)
app.use('/api', routes(io))
server.listen(port)
console.log(`server listening on port ${port}`)


process.on('SIGINT', function() {
    console.log("\nStopping...")
    process.exit()
});

let mongoose = require('mongoose')
mongoose.connect(ENV.db)

app.use((error, request, response, next) => {
    // Middleware to catch all errors
    console.error(error.stack)
    response.status(500).send(error.message)
})
