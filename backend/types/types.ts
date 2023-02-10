export interface notes {
    title: string;
    content: string;
    author: string
}

export interface notebook {
    title: string;
    // color: string;
    notes: notes[]
}