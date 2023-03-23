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

tagsRouter.get('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const tag = await Tag.findById(request.params.id)
            .populate(
                {   path: 'notes',
                    select: 'title id tags',
                    populate: {
                        path: 'tags',
                        select: 'id name'
                    }
                }
            )
        response.json(tag)
    } catch(error: any) {
        if(error.name === 'CastError') {
            return response.status(400).json({message:'Tag does not exist'})
        } else {
            next(error)
        }
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