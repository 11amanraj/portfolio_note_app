import { Request, Response, NextFunction, Router } from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user'

const usersRouter = Router()

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