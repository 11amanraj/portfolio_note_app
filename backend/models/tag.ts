import { Schema, model } from 'mongoose'
import { tag } from '../types/types'

const tagSchema = new Schema<tag>({
    title: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
})

tagSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export default model<tag>('Tag', tagSchema)