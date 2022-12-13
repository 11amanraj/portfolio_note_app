import React from 'react'
import { notebook } from '../shared/interfaces/notes'

const defaultValue:{
    notebooks: notebook,
    tags: string[],
    loading: boolean | null
} = {
    notebooks: {},
    tags: [],
    loading: null
}

const NoteContext = React.createContext(defaultValue)

export default NoteContext