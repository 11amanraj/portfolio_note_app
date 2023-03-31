import { Request, Response, NextFunction, Router } from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user'

const usersRouter = Router()

usersRouter.get('/', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const users = await User.find({})

        return response.status(200).json(users)
    } catch(error) {
        next(error)
    }
})

usersRouter.get('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { id } = request.params
        const user = await User.findById(id)

        if(user === null) return response.status(404).json('User not found')

        return response.status(200).json(user)
    } catch(error: any) {
        if(error.name === 'CastError') {
            return response.status(404).json('User not found')
        }
        next(error)
    }
})

usersRouter.post('/', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { username, name, password } = request.body

        if(!username || !name || !password) {
            return response.status(400).json('Necessary field is missing')
        }

        const duplicateUser = await User.findOne({username: username})

        if(duplicateUser !== null) return response.status(400).json(`User ${username} already exists`)

        const passwordHash = await bcrypt.hash(password, 10)

        const user = new User({
            username: username,
            name: name,
            passwordHash: passwordHash
        })

        const savedUser = await user.save()
        return response.status(201).json(savedUser)
    } catch(error: any) {
        if(error.name === 'ValidationError') {
            return response.status(400).json('Username must be atleast 4 characters long')
        }
        next(error)
    }
})

export default usersRouter