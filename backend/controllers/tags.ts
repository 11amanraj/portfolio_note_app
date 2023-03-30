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
    try {
        const duplicateTag = await Tag.findOne({ name: { $regex: request.body.name, $options: 'i' } })
        
        if(duplicateTag !== null) {
            return response.status(400).json('tag already exists')
        }
        
        const tag = new Tag({name: request.body.name.replace(/\s/g, '')})
        const savedTag = await tag.save()
        return response.status(201).json(savedTag)

    } catch(error: any) {
        next(error)
    }
})

tagsRouter.delete('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        await Note.updateMany(
            { 'tags': request.params.id },
            { '$pull': { 'tags': request.params.id }}
        )
        await Tag.findByIdAndDelete(request.params.id)

        return response.status(204).end()
    } catch(error) {
        next(error)
    }
})

export default tagsRouter