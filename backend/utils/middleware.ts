import { Request, Response, NextFunction } from "express"

const logger = require('./logger')

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

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}