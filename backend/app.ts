import config from './utils/config'
import express from 'express'
const app = express()
import cors = require('cors');
import notesRouter from './controllers/notes'
import notebooksRouter from './controllers/notebooks'
import tagsRouter from './controllers/tags'
import usersRouter from './controllers/users'
import mongoose from 'mongoose'
import logger from './utils/logger'
import middleware from './utils/middleware'
import loginRouter from './controllers/login'

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
app.use('/api/notebooks', notebooksRouter)
app.use('/api/tags', tagsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app