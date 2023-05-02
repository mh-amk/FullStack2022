const express = require('express')
require('express-async-errors')
const app = express()
//const http = require('http')
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

const config= require('./utils/config')
const logger= require('./utils/logger')
const middleware= require('./utils/middleware')
const mongoose = require('mongoose')
const list_helper = require('./utils/list_helper')
/*const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))*/
logger.info(`Connecting to ${config.MONGODB_URI}`)
mongoose.set('strictQuery', true)
mongoose.connect(config.MONGODB_URI)
  .then( () => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/blogs', blogRouter, middleware.userExtractor,middleware.tokenExtractor)
app.use('/api/blogs/:id/comments', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

//app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
