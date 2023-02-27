import { Request, Response, NextFunction, Router } from 'express'
const notesRouter = Router()
import Note from '../models/note'
import Notebook from '../models/notebook'


notesRouter.get('/', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const notes = await Note
            .find({})
            // .sort({ dateCreated: -1 }) 
            .populate('notebook', { title: 1, id: 1 })

        response.json(notes)
    } catch(error) {
        next(error)
    }
    // Note
    //     .find({})
    //     // .sort({ dateCreated: -1 }) 
    //     .populate('notebook', { title: 1, id: 1 })
    //     .then((notes) => {
    //         response.json(notes)
    //     })
    //     .catch((error) => next(error))
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

notesRouter.get('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const note = await Note.findById(request.params.id)
        response.json(note)
    } catch(error: any) {
        if(error.name === 'CastError') {
            return response.status(400).json({message:'Notebook does not exist'})
        } else {
            next(error)
        }
    } 
})

notesRouter.post('/', async (request: Request, response: Response, next: NextFunction) => {
    try {
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

    } catch(error) {
        next(error)
    }
})

notesRouter.delete('/:id', async (request: Request, response: Response, next: NextFunction) => {
    // deleting note also removes the note id from associated notebook

    try {
        await Note.findByIdAndDelete(request.params.id)
        return response.status(204).end()
    } catch(error) {
        next(error)
    }
})

notesRouter.put('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const note = Note.findById(request.params.id)

        if(!note) {
            response.status(400).json({ error: 'note does not exist'})
        } else {
            const updatedNote = await Note.findByIdAndUpdate(request.params.id, request.body)
            response.json(updatedNote)
            response.status(204).end()
        }
    } catch(error) {
        next(error)
    }
})

export default notesRouter