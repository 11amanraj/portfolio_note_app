import { Schema, model } from 'mongoose'
import { notebook } from '../types/types'

const notebookSchema = new Schema<notebook>({
    title: {
        type: String,
        minlength: 3
    },
    // title: String,
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Note'
        }
    ],
    tags: [
        {
            name: {
                type: String
            },
            id: {
                type: String
            }
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

notebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export default model<notebook>('Notebook', notebookSchema)