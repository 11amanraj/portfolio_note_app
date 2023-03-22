import { Request, Response, NextFunction, Router } from 'express'
const notesRouter = Router()
import Note from '../models/note'
import Notebook from '../models/notebook'
import Tag from '../models/tag'
import { ObjectId } from 'mongodb'

notesRouter.get('/', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const notes = await Note
            .find({})
            // .sort({ dateCreated: -1 }) 
            .populate('notebook', { title: 1, id: 1 })
            .populate('tags', { name: 1 })

        response.json(notes)
    } catch(error) {
        next(error)
    }
})

notesRouter.get('/search/:keyword', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const notes = await Note
            .find({title: new RegExp(request.params.keyword, 'i')})
            // .sort({ dateCreated: -1 }) 
            // .populate('notebook', { title: 1, id: 1 })

        response.json(notes)
    } catch(error) {
        next(error)
    }
})

notesRouter.get('/important', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const notes = await Note
            .find({pinned : true})
            .sort({dateModified: -1})
    
        // later add code for infinite scrolling

        if(notes.length < 11) {
            const newNotes = await Note
                .find({pinned : false})
                .sort({dateModified: -1})

            notes.push(...(newNotes.slice(0, 10-notes.length)))
        }    
        response.json(notes)
    } catch(error) {
        next(error)
    }
})

notesRouter.get('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const note = await Note.findById(request.params.id)
            .populate('tags', { name: 1 })
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
            let title
            
            if(request.body.title.length < 1) {
                title = 'Untitled Note'
            } else {
                title = request.body.title
            }

            const date = new Date()
            const dateString = date
                .toISOString()
                .split('T')[0]
                .split('-')
                .reverse()
                .join('-')

            const note = new Note({
                title: title,
                content: request.body.content,
                author: request.body.author,
                pinned: false,
                dateCreated: date,
                stringDateCreated: dateString,
                dateModified: date,
                stringDateModified: dateString,
                notebook: notebook._id,
                tags: []
            })
    
            const savedNote = await note.save()
            
            if(Array.isArray(notebook.notes)) {
                notebook.notes.push(savedNote._id)
                await notebook.save()
            }
            
            return response.status(201).json(savedNote)
    
        }

    } catch(error) {
        next(error)
    }
})

notesRouter.delete('/:id', async (request: Request, response: Response, next: NextFunction) => {
    // deleting note also removes the note id from associated tags

    try {
        await Note.findByIdAndDelete(request.params.id)
        await Notebook.updateOne(
            { 'notes': request.params.id },
            { '$pull': { 'notes': request.params.id }}
        )
        await Tag.updateMany(
            { 'notes': request.params.id },
            { '$pull': { 'notes': request.params.id }}
        )
        return response.status(204).end()
    } catch(error) {
        next(error)
    }
})

notesRouter.put('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const note = await Note.findById(request.params.id)
        const newTagsID = request.body.tags

        const date = new Date()
        const dateString = date
            .toISOString()
            .split('T')[0]
            .split('-')
            .reverse()
            .join('-')

        if(!note) {
            response.status(400).json({ error: 'note does not exist'})
        } else {
            const oldTagsID = note.tags.map(tag => tag.toString())

            // console.log(oldTagsID)
            // console.log(newTagsID)

            // const updatedNote = await Note.findByIdAndUpdate(request.params.id, 
            //     {...request.body, 
            //         dateModified: date,
            //         stringDateModified: dateString, }
            // )
            const updatedNote = await Note.findOneAndUpdate({_id: request.params.id},
                {...request.body, 
                    dateModified: date,
                    stringDateModified: dateString,
                })
            console.log(request.body.pinned)
            console.log(updatedNote)

            const tagsDocument = await Tag.find({
                '_id': { 
                    $in: newTagsID
                }
            })

            const arrayAdditionRemovalSeparator = (oldArray: string[], newArray: string[]) => {
                // compares two array 'old' and 'new' and separate addited item and removed item
                const removedItems = oldArray.filter(item => !newArray.includes(item))
                const addedItems = newArray.filter(item => !oldArray.includes(item))
                
                return {
                    removedItems: removedItems,
                    addedItems: addedItems
                }
            }

            const { removedItems, addedItems } = arrayAdditionRemovalSeparator(oldTagsID, newTagsID)

            const removedTagsDocument = await Tag.find({
                '_id': { 
                    $in: removedItems
                }
            })

            const addedTagsDocument = await Tag.find({
                '_id': { 
                    $in: addedItems
                }
            })

            // // console.log(tagsDocument)
            // // add code to remove note id from tag when specific tag is removed


            // note id is added to new tags if any 
            addedTagsDocument.length>0 && addedTagsDocument.forEach(async (tag) => {
                console.log('new items added')
                if(Array.isArray(tag?.notes) && updatedNote) {
                    tag.notes?.push(updatedNote._id)
                    await tag.save()
                }
            })

            // await Tag.updateOne(

            // )

            // await Tag.update(
            //     { _id: { $in: ['id1', 'id2', 'id3'] } },
            //     { $set: { visibility : yourvisibility } },
            //     {multi: true}
            //  )
            // const updatedTag = await Tag.findByIdAndUpdate(
            //     removedItems[0],
            //     { 'notes': updatedNote?._id },
            //     // { '$pull': updatedNote?._id}
            //     { '$pull': { 'notes': [updatedNote?._id] }}
            //     // { '$set': { 'notes': ['working'] }}
            //     // { '$push': { 'notes': 'ahghjdgh' }}
            // )
            // const updatedTag = await Tag.updateOne(
            //     { id: removedItems[0]},
            //     { 'notes': request.params.id },
            //     { '$pull': { 'notes': updatedNote?._id }}
            // )
            if(removedItems.length > 0) {
                // let result = await foundGroup.update({ $pull: { listItems: { _id: itemId } } });
                const updatedTag = await Tag.updateOne(
                    { id: removedItems[0]},
                    { notes: request.params.id },
                    // { '$pull': updatedNote?._id }
                    { '$pull': { notes: { _id: updatedNote?._id } }}
                ).exec()  
                console.log(updatedTag)
            }
            // const removedTag = await Tag.find({_id: removedItems[0]})
            // const upTag = await removedTag.update({_id: removedItems[0]})
            // console.log(upTag)
            // removedTag.notes()
            // const updatedTag = await Tag.updateMany(
            //     { 'notes': request.params.id },
            //     { '$pull': { 'notes': request.params.id }}
            // )
            // await Tag.updateMany(
            //     { _id: removedItems[0] },
            //     { 'notes': request.params.id },
            //     { '$pull': { 'notes': request.params.id }}
            // )

            // // note id is removed from removed tags if any
            // removedTagsDocument.length>0 && removedTagsDocument.forEach(async (tag) => {
            //     console.log(`removing ${request.params.id} note from ${tag.id}`)
            //     const tagDocument = await Tag.findById(tag.id)
            //     if(tagDocument && tagDocument.notes) {
            //         const notes = tagDocument.notes
            //         if(Array.isArray(notes)) {
            //             // console.log('working')
            //             const newNotes = notes.filter(note => note._id.toString() !== updatedNote?._id.toString())
            //             console.log('checking')
            //             console.log(notes)
            //             console.log(newNotes)
            //             const updatedTag = await Tag.updateOne(
            //                 { 'notes': request.params.id },
            //                 { '$pull': { 'notes': request.params.id }}
            //             )
            //             // const updatedTag = await tagDocument.updateOne(
            //             //     { 'notes': request.params.id },
            //             //     { '$pull': { 'notes': request.params.id }}
            //             // )
            //             // const updatedTag = await Tag.findByIdAndUpdate(
            //             //     tag.id, { $pull: { 'notes': { _id: updatedNote?._id } } }, { safe: true, upsert: true })
            //             // const updatedTag = await Tag.findByIdAndUpdate(tag.id, { notes : newNotes })
            //             // tagDocument.notes = newNotes
            //             console.log(updatedTag)
            //             console.log('check over')
            //         }
            //     }
            // })

            response.json(updatedNote)
            response.status(204).end()
        }
    } catch(error) {
        next(error)
    }
})

export default notesRouter