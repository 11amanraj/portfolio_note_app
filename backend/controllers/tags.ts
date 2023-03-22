import { Request, Response, NextFunction, Router } from 'express'
import Note from '../models/note'

const tagsRouter = Router()
import Tag from '../models/tag'

tagsRouter.get('/', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const tags = await Tag
            .find({})
            .populate('notes', { title: 1, id: 1 })

        response.json(tags)
    } catch (error: any) {
        next(error)
    }
})

tagsRouter.post('/', async (request: Request, response: Response, next: NextFunction) => {
    const tag = new Tag(request.body)

    try {
        const savedTag = await tag.save()
        return response.status(201).json(savedTag)
    } catch(error: any) {
        next(error)
    }
})

export default tagsRouter