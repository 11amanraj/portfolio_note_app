import React from 'react'
import { notebook } from '../shared/interfaces/notes'

const defaultValue:{
    notebooks: notebook,
    tags: string[],
} = {
    notebooks: {},
    tags: [],
}

const NoteContext = React.createContext(defaultValue)

export default NoteContext