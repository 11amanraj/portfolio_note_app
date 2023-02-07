import { Request, Response, NextFunction, Router } from 'express'

const notesRouter = Router()
import Note from '../models/note'
// const Note = require('../models/note')

notesRouter.get('/', (request: Request, response: Response, next: NextFunction) => {
    Note
        .find({})
        .then((notes: any) => {
            response.json(notes)
        })
        .catch((error: any) => next(error))
})

notesRouter.post('/', (request: Request, response: Response, next: NextFunction) => {
    const note = new Note(request.body)

    note
        .save()
        .then((result: any) => {
            response.status(201).json(result)
        })
        .catch((error: any) => next(error))
})

export default notesRouter