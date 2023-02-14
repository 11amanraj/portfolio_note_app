export interface note {
    title: string;
    content: string;
    author: string;
    id: string;
    notebook?: string
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

export enum TypeofSelection {
    NOTE = 'note',
    NOTEBOOK = 'notebook',
    WELCOME = 'welcome',
    CREATENOTE = 'create'
}

export interface selection {
    type: TypeofSelection,
    selected: string | null,
    lastNotebook: string | null,
    onSelect: (type: TypeofSelection ,id: string) => void
}

export interface notebookContext {
    notebooks: null | notebook[],
    loading: boolean
}