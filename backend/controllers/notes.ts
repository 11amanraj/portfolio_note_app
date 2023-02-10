import { Request, Response, NextFunction, Router } from 'express'

const notesRouter = Router()
import Note from '../models/note'
import Notebook from '../models/notebook'

notesRouter.get('/', (request: Request, response: Response, next: NextFunction) => {
    Note
        .find({})
        .populate('notebook', { title: 1, id: 1 })
        .then((notes: any) => {
            response.json(notes)
        })
        .catch((error: any) => next(error))
})

notesRouter.post('/', async (request: Request, response: Response, next: NextFunction) => {
    const notebook = await Notebook.findById(request.body.notebookID) 

    if (notebook === null) {
        console.log('error')
        throw new Error('should be populated')  
    } else {
        const note = new Note({
            title: request.body.title,
            content: request.body.content,
            author: request.body.author,
            notebook: notebook._id
        })

        const savedNote = await note.save()
        response.status(201).json(savedNote)
        notebook.notes = notebook.notes?.concat(savedNote._id)
        await notebook.save()
    }
})

export default notesRouter