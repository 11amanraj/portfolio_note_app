import { Date, ObjectId, PopulatedDoc, Types } from 'mongoose'

export interface notes {
    id?: string;
    title: string;
    content: string;
    user?: {
        type: Types.ObjectId,
        ref: string
    };
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

export interface tag {
    title: string,
    notes: PopulatedDoc<Document & Types.ObjectId[]>,
    id?: string,
    _id?: ObjectId
    user: {
        type: Types.ObjectId,
        ref: string
    }
}

export interface notebook {
    title: string,
    notes: PopulatedDoc<Document & Types.ObjectId[]>,
    tags: tag[],
    id?: string,
    user?: string
}

export interface user {
    username: string,
    name: string,
    _id?: Types.ObjectId,
    passwordHash: string,
    id?: string,
    notebooks?: notebook[]
}