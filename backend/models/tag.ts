import { Schema, model, Types, PopulatedDoc } from 'mongoose'

interface tag {
    name: string,
    notes: PopulatedDoc<Document & Types.ObjectId[]>
    // notes: [
    //     {
    //         type: Types.ObjectId,
    //         ref: string
    //     }
    // ]
}

const tagSchema = new Schema<tag>({
    name: String,
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