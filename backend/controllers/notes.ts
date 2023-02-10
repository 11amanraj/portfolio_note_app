import { Request, Response, NextFunction, Router } from 'express'

const notesRouter = Router()
import Note from '../models/note'
import Notebook from '../models/notebook'
import { notebook } from '../types/types'

notesRouter.get('/', (request: Request, response: Response, next: NextFunction) => {
    Note
        .find({})
        .then((notes: any) => {
            response.json(notes)
        })
        .catch((error: any) => next(error))
})

notesRouter.post('/', async (request: Request, response: Response, next: NextFunction) => {
    const notebook = await Notebook.findById(request.body.notebookID) 
    
    // const note = new Note(request.body)

    const note = new Note({
        title: request.body.title,
        content: request.body.content,
        author: request.body.author,
        notebook: notebook._id
    })


    note
        .save()
        .then((result: any) => {
            response.status(201).json(result)
        })
        .catch((error: any) => next(error))
})

// notesRouter.delete('/', (request: Request, response: Response, next: NextFunction) => {

// })

export default notesRouter