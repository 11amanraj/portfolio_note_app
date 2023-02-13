import { Request, Response, NextFunction, Router } from 'express'

const notebooksRouter = Router()
import Notebook from '../models/notebook'
import { notes } from '../types/types'

notebooksRouter.get('/', async (request: Request, response: Response, next: NextFunction) => {
    const notebook = await Notebook
        .find({}).populate<{notes: notes}>('notes')

    response.json(notebook)
})

notebooksRouter.get('/:id', async (request: Request, response: Response, next: NextFunction) => {
    const notebook = await Notebook
        .findById(request.params.id)

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

export default notebooksRouter