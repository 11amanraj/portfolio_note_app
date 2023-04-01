import { Request, Response, NextFunction, Router } from 'express'
import Note from '../models/note'
import { ObjectId } from 'mongodb'

const tagsRouter = Router()
import Tag from '../models/tag'

tagsRouter.get('/', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = request.user
        if(!user) return response.status(401).json('Authorization Error')

        const tags = await Tag
            .find({user: user._id})
            .populate('user')
            .populate('notes', { title: 1, id: 1 })

        response.json(tags)
    } catch (error: any) {
        next(error)
    }
})

tagsRouter.get('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = request.user
        if(!user) return response.status(401).json('Authorization Error')
        
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

tagsRouter.put('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { id } = request.params
        const { name } = request.body

        if(!name) response.status(400).json('Incomplete request! Please add Name')

        const duplicateTag = await Tag
            .findOne({ $and: [
                { _id: {$ne: new ObjectId(id)} },
                { name: { $regex: name, $options: 'i' }}
            ]})

        if(duplicateTag !== null) {
            return response.status(400).json('tag already exists')
        }

        const updatedTag = await Tag
            .findByIdAndUpdate(id, { name: name.replace(/\s/g, '') }, { new: true })

        if(updatedTag === null) response.status(400).json('Tag does not exist')

        return response.status(201).json(updatedTag)
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