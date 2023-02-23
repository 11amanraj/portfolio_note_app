import { Date, Types } from 'mongoose'

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
    // color: string;
    notes?: [
        {
            type: Types.ObjectId,
            ref: string
        }
    ]
}