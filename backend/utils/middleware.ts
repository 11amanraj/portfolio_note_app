import { Request, Response, NextFunction } from 'express'

import logger from './logger'

// const logger = require('./logger')

const requestLogger = (request: Request, response: Response, next: NextFunction) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request: Request, response: Response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

//check error type
const errorHandler = (error: any, request: Request, response: Response, next: NextFunction) => {
    logger.error(error.message)
    next(error)
}

const middleware = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}

export default middleware

// module.exports = {
//   requestLogger,
//   unknownEndpoint,
//   errorHandler
// }