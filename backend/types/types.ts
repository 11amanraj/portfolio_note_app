import { Date, PopulatedDoc, Types } from 'mongoose'

export interface notes {
    title: string;
    content: string;
    author: string;
    pinned: boolean;
    dateCreated: Date;
    dateModified: Date;
    stringDateCreated: string;
    stringDateModified: string;
    notebook: 
        {
            type: Types.ObjectId,
            ref: string
        };
    tags: [
        {
            type: Types.ObjectId,
            ref: string
        }
    ]
}

interface tag {
    name: string,
    id: string
}

export interface notebook {
    title: string;
    notes: PopulatedDoc<Document & Types.ObjectId[]>
    tags: tag[]
}