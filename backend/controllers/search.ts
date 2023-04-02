import { Request, Response, NextFunction, Router } from 'express'
import Notebook from '../models/notebook'
import Note from '../models/note'
import Tag from '../models/tag'
const searchRouter = Router()

searchRouter.get('/:keyword', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = request.user
        if(!user) return response.status(401).json('Authorization Error')

        if(!request.params.keyword) return response.status(200).json({
            notes: [],
            notebooks: [],
            tags: []
        })

        const notes = await Note
            .find({$or: [
                {title: new RegExp(request.params.keyword, 'i')},
                {content: new RegExp(request.params.keyword, 'i')}
            ], user: user._id})

        const notebooks = await Notebook
            .find({
                title: new RegExp(request.params.keyword, 'i'), 
                user: user._id
            })

        const tags = await Tag
            .find({
                title: new RegExp(request.params.keyword, 'i'), 
                user: user._id
            })

        const searchResult = {
            notes: notes,
            notebooks: notebooks,
            tags: tags
        }
            
        return response.status(200).json(searchResult)
    } catch (error) {
        next(error)
    }  
})

export default searchRouter