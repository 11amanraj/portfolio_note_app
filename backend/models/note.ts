import { Schema, model } from 'mongoose'
import { notes } from '../types/types'

const noteSchema = new Schema<notes>({
    title: String,
    content: String,
    pinned: Boolean,
    dateCreated: Date,
    dateModified: Date,
    stringDateCreated: String,
    stringDateModified: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    notebook: {
        type: Schema.Types.ObjectId,
        ref: 'Notebook'
    },
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tag'
        }
    ]
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export default model<notes>('Note', noteSchema)