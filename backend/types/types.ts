import { Types } from 'mongoose'

export interface notes {
    title: string;
    content: string;
    author: string;
    notebook: [
        {
            type: Types.ObjectId,
            ref: string
        }
    ]
}

export interface notebook {
    title: string;
    // color: string;
    notes: notes[]
}