import React, { useState, useEffect } from 'react'
import NoteContext from './note-context';
import axios from 'axios';
import { notebook, note } from '../shared/interfaces/notes';

const NoteContextProvider = ({children}: {children: React.ReactNode}) => {
    const [notebooks, setNotebooks] = useState<notebook>({})
    const [tags, setTags] = useState<string[]>([])

    useEffect(() => {
        axios.get<notebook>('http://localhost:3001/notebooks')
            .then(response => {
              const arr = Object.keys(response.data).map(key => (
                response.data[key].map((item: note) => item.tags) 
                  )).flat(2)
              const set = new Set<string>(arr)
              
              setTags(Array.from(set))
              setNotebooks(response.data)
            })
            .catch(error => console.log(error))
    }, [])
    
    return (
        <NoteContext.Provider value={{notebooks, tags}}>
            {children}
        </NoteContext.Provider>
    )
}

export default NoteContextProvider