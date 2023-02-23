import { Request, Response, NextFunction, Router } from 'express'

const notebooksRouter = Router()
import Notebook from '../models/notebook'
import { notes } from '../types/types'

notebooksRouter.get('/', async (request: Request, response: Response, next: NextFunction) => {
    const notebook = await Notebook
        .find({})
        .populate<{notes: notes}>({
            path: 'notes',
            options: { sort: { title: -1}}
        })

    response.json(notebook)
})

notebooksRouter.get('/:id', async (request: Request, response: Response, next: NextFunction) => {
    const notebook = await Notebook
        .findById(request.params.id).populate<{notes: notes}>('notes', {title: 1, author: 1, id: 1})

    response.json(notebook)
})

notebooksRouter.post('/', (request: Request, response: Response, next: NextFunction) => {
    const notebook = new Notebook(request.body)

    notebook
        .save()
        .then((result: any) => {
            response.status(201).json(result)
        })
        .catch((error: any) => next(error))
})

notebooksRouter.delete('/:id', async (request: Request, response: Response, next: NextFunction) => {
    Notebook
        .findByIdAndDelete(request.params.id)
        .then((result: any) => response.status(204).end())
})

export default notebooksRouter