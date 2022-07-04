const express = require('express')

// Import modular routers
const dbRouter = require('./db')

const app = express()

app.use('/db', dbRouter)

module.exports = app;