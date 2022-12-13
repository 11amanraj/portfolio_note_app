import React from 'react'
import { allNotes } from '../shared/interfaces/notes'

interface noteContext extends allNotes {
    loading: null | boolean
}

const defaultValue: noteContext = {
    notebooks: {},
    tags: [],
    loading: null,
    headers: []
}

const NoteContext = React.createContext(defaultValue)

export default NoteContext