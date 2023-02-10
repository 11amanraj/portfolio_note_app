import { Schema, model } from 'mongoose'
import { notebook } from '../types/types'

const notebookSchema = new Schema<notebook>({
    title: String,
})

notebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export default model<notebook>('Notebook', notebookSchema)