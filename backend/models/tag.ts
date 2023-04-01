import { Schema, model, Types, PopulatedDoc } from 'mongoose'
import { notes } from '../types/types'

interface tag {
    name: string,
    notes: PopulatedDoc<Document & Types.ObjectId[]>,
    user?: {
        type: Schema.Types.ObjectId,
        ref: string
    }
}

const tagSchema = new Schema<tag>({
    name: String,
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