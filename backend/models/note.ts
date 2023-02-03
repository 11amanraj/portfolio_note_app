import { Schema, model } from 'mongoose';

interface notes {
    title: string;
    content: string;
    author: string
}

const noteSchema = new Schema<notes>({
    title: String,
    content: String,
    author: String
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = model<notes>('Note', noteSchema)