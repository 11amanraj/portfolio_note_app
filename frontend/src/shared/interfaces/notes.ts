export interface tag {
    title: string,
    id: string
}

export interface note {
    title: string;
    content: string;
    id: string;
    pinned: boolean;
    dateCreated: Date;
    dateModified: Date;
    stringDateCreated: string;
    stringDateModified: string;
    notebook?: string;
    tags?: tag[]
}

export interface notebook {
    title: string;
    notes: note[];
    id: string;
}

export interface notesCollection {
    title: string,
    id: string,
    author: string
}

export interface allNotes {
    notebooks: notebook,
    tags: string[],
    headers: string[]
}

export enum CollectionType {
    NOTEBOOK = 'notebook',
    IMPORTANT = 'important',
    TAG = 'tag'
}

export interface user {
    id?: string,
    token: string,
    username: string,
    name: string
}