import { Request, Response, NextFunction } from 'express'

import logger from './logger'

export type token = string

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

const tokenExtractor = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.get('authorization')
    
    if(!authHeader) {
        request.token = null
    } else if (authHeader.startsWith('Bearer ')){
        request.token = authHeader.substring(7, authHeader.length)
    } else {
        request.token = null
    }
  
    next()
}

const middleware = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor
}

export default middleware