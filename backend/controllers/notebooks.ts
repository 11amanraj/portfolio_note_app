import { Request, Response, NextFunction, Router } from 'express'
import { ObjectId } from 'mongodb'
import Notebook from '../models/notebook'
import Note from '../models/note'
import { notes } from '../types/types'
const notebooksRouter = Router()

notebooksRouter.get('/', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = request.user
        if(!user) return response.status(401).json('Authorization Error')

        const notebook = await Notebook
            .find({user: user._id})
            .populate<{notes: notes}>({
                path: 'notes',
                options: { sort: { title: 1} }
            })

            
        response.json(notebook)
    } catch (error: any) {
        next(error)
    }
    
})

notebooksRouter.get('/:id', async (request: Request, response: Response, next: NextFunction) => {  
    try {
        const user = request.user

        if(!user) return response.status(404).json('User not found')

        // fetching all tags associated with all the notes in the notebook
        const tags = await Note.
            aggregate([
                { $match: { notebook: new ObjectId(request.params.id) } },
                { $unwind: { path: '$tags' } },
                { $group: { _id: '$tags' } },
                { $lookup: 
                    {
                        from: 'tags',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'tag',
                    },
                },
                { $set: { tag: { $arrayElemAt: ['$tag', 0]}}},
                { $replaceRoot: { newRoot: '$tag' } },
                { $addFields: { id: { $toString: '$_id'}} },
                { $unset: ['_id', 'notes', '__v'] }
            ])

        const notebook = await Notebook
            .findOneAndUpdate({
                _id: new ObjectId(request.params.id), 
                user: user._id
            }, {tags: tags}, { new: true })
            .populate('user')
            .populate<{notes: notes}>('notes', 
                {   title: 1, 
                    id: 1, 
                    stringDateCreated: 1, 
                    pinned: 1})
                    
        // response.json(updatedNotebook)
        
        // const notebook = await Notebook
        //     .findOne({_id: new ObjectId(request.params.id), user: user._id})
        //     .populate<{notes: notes}>('notes', 
        //         {   title: 1, 
        //             author: 1, 
        //             id: 1, 
        //             stringDateCreated: 1, 
        //             pinned: 1})

        if(notebook === null) return response.status(404).json('Notebook Not Found')
        
        return response.status(200).json(notebook)

    } catch(error: any) {
        if (error.name === 'CastError') {
            return response.status(400).json({message:'Notebook does not exist'})
        } else {
            next(error)
        }
    }
})

notebooksRouter.get('/:id/search/:keyword', async (request: Request, response: Response, next: NextFunction) => {
    const include = {
        path: 'notes',
        match: {
            title: {
                $regex: request.params.keyword,
                $options: 'i'
            }
        }
    }
    
    try {
        const notebook = await Notebook
            .findById(request.params.id)
            .populate<{notes: notes}>(include)
    
        response.json(notebook)
    } catch(error: any) {
        if (error.name === 'CastError') {
            return response.status(400).json({message:'Notebook does not exist'})
        } else {
            next(error)
        }
    }
})

notebooksRouter.get('/search/:keyword', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const notebooks = await Notebook
            .find({title: new RegExp(request.params.keyword, 'i')})
            // .sort({ dateCreated: -1 }) 
            .populate<{notes: notes}>('notes', {title: 1, id: 1, dateCreated: 1, pinned: 1, dateModified: 1})

        response.json(notebooks)
    } catch(error) {
        next(error)
    }
})

notebooksRouter.post('/', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { title } = request.body
        if(!title) return response.status(400).json('Title missing')
        
        const user = request.user
        if(!user) return response.status(404).json('User not found')
        
        const existingNotebook = await Notebook.findOne({title: title, user: user._id})
        if(existingNotebook !== null ) {
            return response.status(409).json(`${title} already exists`)
        }

        const newNotebook = {
            title: title,
            user: user._id
        }
        
        const notebook = new Notebook(newNotebook)
        const savedNotebook = await notebook.save()
        return response.status(201).json(savedNotebook)
    } catch(error: any) {
        if(error.name === 'ValidationError') {
            return response.status(400).json('Title must be atleast 3 characters long')
        } else {
            next(error)
        }
    }
})

notebooksRouter.put('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = request.user
        if(!user) return response.status(401).json('Authorization Error')

        const { id } = request.params
        const { title } = request.body
    
        if(!title) response.status(400).json('Incomplete request! Please add title')

        const existingTitle = await Notebook.findOne({ $and: [
            { _id: {$ne: new ObjectId(id)} },
            { title: title },
            { user: user._id }
        ]})

        if(existingTitle !== null) response.status(409).json(`${title} already exists! Please choose another title`)
        
        const updatedNotebook = await Notebook
            .findByIdAndUpdate(id, { title: title }, { new: true, runValidators: true })
  
        if(updatedNotebook === null) return response.status(404).json('Notebook not found')

        return response.status(201).json(updatedNotebook)
    } catch(error: any) {
        if(error.name === 'ValidationError') {
            return response.status(400).json('Title must be atleast 3 characters long')
        } else {
            next(error)
        }
    }
})

notebooksRouter.delete('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = request.user
        if(!user) return response.status(401).json('Authorization Error')

        const notebook = await Notebook
            .findOne({_id: new ObjectId(request.params.id), user: user._id})

        if(notebook === null) response.status(404).json('Notebook not found')

        // const notebook = await Notebook.findById(request.params.id)
        
        if(notebook) {
            const notes = notebook.notes
            await Note.deleteMany({ _id: { $in: notes } })
        } 

        await Notebook.findByIdAndDelete(request.params.id)
        return response.status(204).end()

    } catch(error: any) {
        if (error.name === 'CastError') {
            return response.status(400).json({message:'Notebook does not exist'})
        } else {
            next(error)
        }
    } 
})

export default notebooksRouter