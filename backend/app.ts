// const config = require('./utils/config')
import config from './utils/config'
import express from 'express'
// const express = require('express')
const app = express()
// const cors = require('cors')
import cors = require('cors');
import notesRouter from './controllers/notes'
// const notesRouter = require('./controllers/notes')
import mongoose from 'mongoose'
// const mongoose = require('mongoose')
import logger from './utils/logger'
// const logger = require('./utils/logger')
import middleware from './utils/middleware'
// const middleware = require('./utils/middleware')

logger.info('connecting to', config.MONGO_URL)

mongoose.connect(config.MONGO_URL)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error: any) => {
        logger.error('error connecting to MongoDB', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
// module.exports = app