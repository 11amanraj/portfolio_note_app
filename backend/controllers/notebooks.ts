import { Request, Response, NextFunction, Router } from 'express'
import { ObjectId } from 'mongodb'
import Notebook from '../models/notebook'
import Note from '../models/note'
import Tag from '../models/tag'
import { notes } from '../types/types'
import User from '../models/user'
import jwt, { JwtPayload } from 'jsonwebtoken'
const notebooksRouter = Router()

const getToken = (request: Request) => {
    const auth = request.get('authorization')
    if(auth && auth.startsWith('Bearer ')) {
        return auth.replace('Bearer ', '')
    }
    return null 
}

interface token extends JwtPayload {
    username: string,
    id: string
}

notebooksRouter.get('/', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const notebook = await Notebook
            .find({})
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
        const tags = await Note.
            aggregate(
                [
                    {
                        $match:
                        {
                            notebook: new ObjectId(request.params.id)
                        },
                    },
                    {
                        $unwind: { path: '$tags' },
                    },
                    {
                        $group:  { _id: '$tags' }
                    },
                    {   $lookup:
                        {
                            from: 'tags',
                            localField: '_id',
                            foreignField: '_id',
                            as: 'tag',
                        },
                    },
                    {   $set:
                        {
                            tag: {
                                $arrayElemAt: ['$tag', 0],
                            },
                        },
                    },
                    {   $replaceRoot:
                        {
                            newRoot: '$tag',
                        },
                    },
                    { 
                        $addFields: { id: { $toString: '$_id' } }
                    },
                    {
                        $unset: ['_id', 'notes', '__v']
                    }
                ]
            )

        const updatedNotebook = await Notebook
            .findByIdAndUpdate(request.params.id, {tags: tags})
            .populate('user')
            .populate<{notes: notes}>('notes', 
                {   title: 1, 
                    author: 1, 
                    id: 1, 
                    stringDateCreated: 1, 
                    pinned: 1})
    
        response.json(updatedNotebook)

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
            .populate<{notes: notes}>('notes', {title: 1, author: 1, id: 1, dateCreated: 1, pinned: 1, dateModified: 1})

        response.json(notebooks)
    } catch(error) {
        next(error)
    }
})

notebooksRouter.post('/', async (request: Request, response: Response, next: NextFunction) => {
    const token = request.token
    if(token === null || token === undefined ) return response.status(401).json('authorization error')
    
    const decodedToken = jwt.verify(token, process.env.SECRET as string) as JwtPayload    
    
    if(!decodedToken.id) {
        return response.status(401).json('Token invalid')
    }
    
    try {
        const { title } = request.body
        
        if(!title) return response.status(400).json('Title missing')
        
        const existingNotebook = await Notebook.findOne({title: title})
        if(existingNotebook !== null ) {
            return response.status(400).json(`${title} already exists`)
        }

        const user = await User.findById(decodedToken.id)

        if(!user) return response.status(404).json('User not found')

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
        const { id } = request.params
        const { title } = request.body
    
        if(!title) response.status(400).json('Incomplete request! Please add title')

        const existingTitle = await Notebook.findOne({ $and: [
            { _id: {$ne: new ObjectId(id)} },
            { title: title },
        ]})

        if(existingTitle !== null) response.status(400).json(`${title} already exists! Please choose another title`)
        
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
        const notebook = await Notebook.findById(request.params.id)
        
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