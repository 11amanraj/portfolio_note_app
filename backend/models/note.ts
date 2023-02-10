import { Schema, model } from 'mongoose'
import { notes } from '../types/types'

const noteSchema = new Schema<notes>({
    title: String,
    content: String,
    author: String,
    notebook: {
        type: Schema.Types.ObjectId,
        ref: 'Notebook'
    }
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export default model<notes>('Note', noteSchema)