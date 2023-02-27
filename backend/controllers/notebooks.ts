import { Request, Response, NextFunction, Router } from 'express'

const notebooksRouter = Router()
import Notebook from '../models/notebook'
import Note from '../models/note'
import { notes } from '../types/types'

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
        const notebook = await Notebook
            .findById(request.params.id)
            .populate<{notes: notes}>('notes', {title: 1, author: 1, id: 1, dateCreated: 1, pinned: 1, dateModified: 1})
    
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
    try {
        const notebook = new Notebook(request.body)
        const savedNotebook = await notebook.save()
        return response.status(201).json(savedNotebook)
    } catch(error: any) {
        next(error)
    }
})

notebooksRouter.delete('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const notebook = await Notebook.findById(request.params.id)
        if(notebook) {
            const notes = notebook.notes
            if(Array.isArray(notes)) {
                notes.map(async (noteID) => {
                    await Note.findByIdAndDelete(noteID)
                })
            }
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