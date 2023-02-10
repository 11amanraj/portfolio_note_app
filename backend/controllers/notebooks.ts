import { Request, Response, NextFunction, Router } from 'express'

const notebooksRouter = Router()
import Notebook from '../models/notebook'

notebooksRouter.get('/', (request: Request, response: Response, next: NextFunction) => {
    Notebook
        .find({})
        .then((notes: any) => {
            response.json(notes)
        })
        .catch((error: any) => next(error))
})

notebooksRouter.post('/', (request: Request, response: Response, next: NextFunction) => {
    const note = new Notebook(request.body)

    note
        .save()
        .then((result: any) => {
            response.status(201).json(result)
        })
        .catch((error: any) => next(error))
})

export default notebooksRouter