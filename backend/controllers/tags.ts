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
                {   
                    path: 'notes',
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
        const { title } = request.body
        if(!title) return response.status(400).json('Title missing')
        
        const user = request.user
        if(!user) return response.status(401).json('Authorization Error')

        const duplicateTag = await Tag.findOne({ 
            title: { $regex: title, $options: 'i' },
            user: user._id 
        })
        
        if(duplicateTag !== null) {
            return response.status(409).json('tag already exists')
        }
        
        const tag = new Tag({
            title: title.replace(/\s/g, ''),
            user: user._id
        })

        const savedTag = await tag.save()
        return response.status(201).json(savedTag)
    } catch(error: any) {
        next(error)
    }
})

tagsRouter.put('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { id } = request.params
        const { title } = request.body

        if(!title) response.status(400).json('Incomplete request! Please add Name')

        const duplicateTag = await Tag
            .findOne({ $and: [
                { _id: {$ne: new ObjectId(id)} },
                { title: { $regex: title, $options: 'i' }}
            ]})

        if(duplicateTag !== null) {
            return response.status(400).json('tag already exists')
        }

        const updatedTag = await Tag
            .findByIdAndUpdate(id, { title: title.replace(/\s/g, '') }, { new: true })

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