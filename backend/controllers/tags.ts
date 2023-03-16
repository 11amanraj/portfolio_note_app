import { Request, Response, NextFunction, Router } from 'express'

const tagsRouter = Router()
import Tag from '../models/tag'

tagsRouter.get('/', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const tags = await Tag
            .find({})
            // .populate({
            //     path: 'notes',
            //     options: { sort: { title: 1 } }
            // })

        response.json(tags)
    } catch (error: any) {
        next(error)
    }
})

tagsRouter.post('/', async (request: Request, response: Response, next: NextFunction) => {
    const tag = new Tag(request.body)

    try {
        const savedTag = await tag.save()
        return response.status(201).json(savedTag)
    } catch(error: any) {
        next(error)
    }
    

    // const existingNotebook = await Notebook.find({title: request.body.title})
    
    // if(existingNotebook.length > 0) {
    //     console.log(`${request.body.title} already exists`)
    //     return response.status(400).json(`${request.body.title} already exists`)
    // } else {
    //     try {
    //         const notebook = new Notebook(request.body)
    //         const savedNotebook = await notebook.save()
    //         return response.status(201).json(savedNotebook)
    //     } catch(error: any) {
    //         if(error.name === 'ValidationError') {
    //             return response.status(400).json('Title must be atleast 3 characters long')
    //         } else {
    //             next(error)
    //         }
    //     }
})

export default tagsRouter