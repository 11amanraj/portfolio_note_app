import React, { useState, useEffect } from 'react'
import NoteContext from './note-context';
import axios from 'axios';
import { notebook, note, allNotes } from '../shared/interfaces/notes';

const NoteContextProvider = ({children}: {children: React.ReactNode}) => {
    const [notes, setNotes] = useState<allNotes>({
        notebooks: {},
        tags: [],
        headers: []
    })
    const [loading, setLoading] = useState<boolean | null>(null)

    useEffect(() => {
        setLoading(true)
        
        axios.get<notebook>('http://localhost:8000/api/notebooks')
            .then(response => {
              const notebookHeaders = Object.keys(response.data)

              const arr = notebookHeaders.map(key => (
                response.data[key].map((item: note) => item.tags) 
                  )).flat(2)
              const set = new Set<string>(arr)

              setNotes({
                notebooks: response.data,
                tags: Array.from(set),
              })
              setLoading(false)
            })
            .catch(error => console.log(error))

        // axios.get<notebook>('http://localhost:3001/notebooks')
        //     .then(response => {
        //       const notebookHeaders = Object.keys(response.data)

        //       const arr = notebookHeaders.map(key => (
        //         response.data[key].map((item: note) => item.tags) 
        //           )).flat(2)
        //       const set = new Set<string>(arr)

        //       setNotes({
        //         notebooks: response.data,
        //         tags: Array.from(set),
        //         headers: notebookHeaders
        //       })
        //       setLoading(false)
        //     })
        //     .catch(error => console.log(error))
    }, [])
    
    return (
        <NoteContext.Provider value={{...notes, loading}}>
            {children}
        </NoteContext.Provider>
    )
}

export default NoteContextProvider