import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Router, Request, Response, NextFunction } from 'express'
import User from '../models/user'

const loginRouter = Router()

loginRouter.post('/', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { username, password } = request.body

        const user = await User.findOne({username: username})
        const isPasswordCorrect = user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash)

        if(!(user && isPasswordCorrect)) {
            return response.status(401).json(
                'invalid username or password'
            )
        }

        const userForToken = {
            username: user.username,
            id: user._id
        }

        const token = jwt.sign(userForToken, process.env.SECRET as string)

        return response
            .status(200)
            .send({ token, username: user.username, name: user.name, id: user.id})
    } catch(error) {
        next(error)
    }
})

export default loginRouter