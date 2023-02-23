import { Request, Response, NextFunction, Router } from 'express'
const notesRouter = Router()
import Note from '../models/note'
import Notebook from '../models/notebook'


notesRouter.get('/', (request: Request, response: Response, next: NextFunction) => {
    Note
        .find({})
        // .sort({ dateCreated: -1 }) 
        .populate('notebook', { title: 1, id: 1 })
        .then((notes) => {
            console.log(notes)
            response.json(notes)
        })
        .catch((error) => next(error))
})

// notesRouter.get('/important', (request: Request, response: Response, next: NextFunction) => {
//     Note
//         .find({})
//         // .sort({ dateCreated: -1 }) 
//         .populate('notebook', { title: 1, id: 1 })
//         .then((notes) => {
//             console.log(notes)
//             response.json(notes)
//         })
//         .catch((error) => next(error))
// })

notesRouter.get('/:id', (request: Request, response: Response, next: NextFunction) => {
    Note
        .findById(request.params.id)
        .then((notes) => {
            response.json(notes)
        })
        .catch((error) => next(error))
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
            pinned: false,
            dateCreated: new Date(),
            notebook: notebook._id
        })

        const savedNote = await note.save()
        response.status(201).json(savedNote)

        if(Array.isArray(notebook.notes)) {
            notebook.notes.push(savedNote._id)
            await notebook.save()
        }
    }
})

notesRouter.delete('/:id', async (request: Request, response: Response, next: NextFunction) => {
    Note
        .findByIdAndDelete(request.params.id)
        .then(() => response.status(204).end())
})

export default notesRouter