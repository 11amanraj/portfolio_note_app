import { Request, Response, NextFunction, Router } from 'express'
const notesRouter = Router()
import Note from '../models/note'
import Notebook from '../models/notebook'
import Tag from '../models/tag'
import { ObjectId } from 'mongodb'

notesRouter.get('/', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = request.user
        if(!user) return response.status(401).json('Authorization Error')

        const notes = await Note
            .find({user: user._id})
            // .sort({ dateCreated: -1 }) 
            .populate('user')
            .populate('notebook', { title: 1, id: 1 })
            .populate('tags', { name: 1 })

        response.json(notes)
    } catch(error) {
        next(error)
    }
})

notesRouter.get('/search/:keyword', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const notes = await Note
            .find({title: new RegExp(request.params.keyword, 'i')})
            // .sort({ dateCreated: -1 }) 
            // .populate('notebook', { title: 1, id: 1 })

        response.json(notes)
    } catch(error) {
        next(error)
    }
})

notesRouter.get('/important', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const notes = await Note
            .find({pinned : true})
            .sort({dateModified: -1})
    
        // later add code for infinite scrolling

        if(notes.length < 11) {
            const newNotes = await Note
                .find({pinned : false})
                .sort({dateModified: -1})

            notes.push(...(newNotes.slice(0, 10-notes.length)))
        }    
        response.json(notes)
    } catch(error) {
        next(error)
    }
})

notesRouter.get('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const note = await Note.findById(request.params.id)
            .populate('tags', { title: 1 })

        if(note === null) return response.status(404).json({message:'Note was not found'})

        response.json(note)
    } catch(error: any) {
        if(error.name === 'CastError') {
            return response.status(400).json({message:'Wrong Identification'})
        } else {
            next(error)
        }
    } 
})

notesRouter.post('/', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = request.user
        if(!user) return response.status(401).json('Authorization Error')

        if(!request.body.notebookID) return response.status(404).json('Notebook ID missing')

        const notebook = await Notebook.findById(request.body.notebookID)

        if (notebook === null) {
            console.log('error')
            throw new Error('should be populated')  
        } else {
            let title
            
            if(request.body.title.length < 1) {
                title = 'Untitled Note'
            } else {
                title = request.body.title
            }

            const date = new Date()
            const dateString = date
                .toISOString()
                .split('T')[0]
                .split('-')
                .reverse()
                .join('-')

            const note = new Note({
                title: title,
                content: request.body.content,
                user: user._id,
                pinned: false,
                dateCreated: date,
                stringDateCreated: dateString,
                dateModified: date,
                stringDateModified: dateString,
                notebook: notebook._id,
                tags: []
            })
    
            const savedNote = await note.save()
            
            if(Array.isArray(notebook.notes)) {
                notebook.notes.push(savedNote._id)
                await notebook.save()
            }
            
            return response.status(201).json(savedNote)
    
        }

    } catch(error) {
        next(error)
    }
})

notesRouter.delete('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = request.user
        if(!user) return response.status(401).json('Authorization Error')

        const note = await Note
            .findOne({_id: new ObjectId(request.params.id), user: user._id})

        if(note === null) return response.status(404).json('Note not found')

        await Note.deleteOne({
            user: user._id,
            _id: new ObjectId(request.params.id)
        })
        await Note.findByIdAndDelete(request.params.id)
        await Notebook.updateOne(
            { 'notes': request.params.id },
            { '$pull': { 'notes': request.params.id }}
        )
        await Tag.updateMany(
            { 'notes': request.params.id },
            { '$pull': { 'notes': request.params.id }}
        )
        return response.status(204).end()
    } catch(error) {
        next(error)
    }
})

notesRouter.put('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = request.user
        if(!user) return response.status(401).json('Authorization Error')

        const note = await Note.findById(request.params.id)
        
        if(!note) {
            response.status(404).json({ error: 'note does not exist'})
        } else {
            const newTagsID = request.body.tags
    
            const date = new Date()
            const dateString = date
                .toISOString()
                .split('T')[0]
                .split('-')
                .reverse()
                .join('-')

            const updatedNote = await Note.findOneAndUpdate({_id: request.params.id},
                {...request.body, 
                    dateModified: date,
                    stringDateModified: dateString,
                },
                {new: true}
            )
                
            if(newTagsID) {
                const oldTagsID = note.tags.map(tag => tag.toString())
                
                const arrayAdditionRemovalSeparator = (oldArray: string[], newArray: string[]) => {
                    // compares two array 'old' and 'new' and separate addited item and removed item
                    const removedItems = oldArray.filter(item => !newArray.includes(item))
                    const addedItems = newArray.filter(item => !oldArray.includes(item))
                    
                    return {
                        removedItems: removedItems,
                        addedItems: addedItems
                    }
                }
    
                const { removedItems, addedItems } = arrayAdditionRemovalSeparator(oldTagsID, newTagsID)
    
                await Tag.updateMany(
                    { _id: { $in: addedItems } },
                    { '$push': { 'notes': request.params.id }}
                )

                await Tag.updateMany(
                    { _id: { $in: removedItems } },
                    { '$pull': { 'notes': request.params.id }}
                )
            }

            return response.status(200).json(updatedNote)
        }
    } catch(error) {
        next(error)
    }
})

export default notesRouter