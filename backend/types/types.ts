import { Date, PopulatedDoc, Types } from 'mongoose'

export interface notes {
    title: string;
    content: string;
    author: string;
    pinned: boolean;
    dateCreated: Date
    notebook: 
        {
            type: Types.ObjectId,
            ref: string
        }
}

export interface notebook {
    title: string;
    notes: PopulatedDoc<Document & Types.ObjectId[]>
}