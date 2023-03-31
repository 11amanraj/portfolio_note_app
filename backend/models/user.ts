import { Schema, model, Types } from 'mongoose'
import { user } from '../types/types'

const userSchema = new Schema<user>({
    username: String,
    name: String,
    passwordHash: String,
    notebooks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Notebook'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

export default model<user>('User', userSchema)