export interface note {
    title: string;
    content: string;
    author: string;
    id: string;
}

export interface notebook {
    title: string;
    notes: note[];
    id: string;
}

export interface allNotes {
    notebooks: notebook,
    tags: string[],
    headers: string[]
}