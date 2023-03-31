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

        return response.status(200).json(user)
    } catch(error) {
        next(error)
    }
})

usersRouter.post('/', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { username, name, password } = request.body
        const passwordHash = await bcrypt.hash(password, 10)

        const user = new User({
            username: username,
            name: name,
            passwordHash: passwordHash
        })

        const savedUser = await user.save()
        return response.status(201).json(savedUser)
    } catch(error) {
        next(error)
    }
})

export default usersRouter