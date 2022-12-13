import React from 'react'

interface note {
    id: number,
    tags: string[],
    title: string,
    body: string
}

interface notebook {
    [key: string]: note[]
}

const defaultValue:{
    notebooks: notebook,
    tags: string[],
} = {
    notebooks: {},
    tags: [],
}

const NoteContext = React.createContext(defaultValue)

export default NoteContext