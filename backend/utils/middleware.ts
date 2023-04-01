import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import logger from './logger'
import User from '../models/user'

// export type token = string

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

const userExtractor = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const token = request.token
        
        if(token === null || token === undefined ) return response.status(401).json('authorization error')
        
        console.log(token)
        const decodedToken = jwt.verify(token, process.env.SECRET as string) as JwtPayload    
        
        if(!decodedToken.id) {
            return response.status(401).json('Token invalid')
        }
    
        request.user = await User.findById(decodedToken.id)
    } catch(error: any) {
        if(error.name === 'JsonWebTokenError') {
            return response.status(401).json('invalid token')
        }
    }
    
    next()
}

const middleware = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}

export default middleware