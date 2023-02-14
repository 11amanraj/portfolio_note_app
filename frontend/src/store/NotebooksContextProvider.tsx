import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { notebook } from "../shared/interfaces/notes";

interface notebookContext {
    notebooks: null | notebook[],
    loading: boolean,
    addNotebook: (title: string) => void,
    deleteNotebook: (id: string) => void,
    lastId: string
}

const defaultValue : notebookContext = {
    notebooks: null,
    loading: false,
    addNotebook: (title: string) => {},
    deleteNotebook: (id: string) => {},
    lastId: ''
}

export const NotebooksContext = React.createContext(defaultValue)

const NotebooksContextProvider = ({children}: {children: React.ReactNode}) => {
    const [notebooks, setNotebooks] = useState<notebook[] | null>(null)
    const [loading, setLoading] = useState(false)

    // added to force rerender when a new notebook is added
    const [lastID,setLastID] = useState('')

    useEffect(() => {
        setLoading(true)
        axios
            .get('http://localhost:8000/api/notebooks')
            .then(response => {
                setNotebooks(response.data)
                setLoading(false)
            })
            .catch(error => console.log(error.message))
    }, [lastID])

    const addNotebookHandler = (title: string) => {
        axios
            .post('http://localhost:8000/api/notebooks', {title: title})
            .then(response => setLastID(response.data.id))
            // .catch(error => console.log('context provider error'))
        
        console.log(title)
        //later add route to new notebook url
    }

    const deleteNotebookHandler = (id: string) => {
        axios
            .delete(`http://localhost:8000/api/notebooks/${id}`)
            .then(response => console.log(response))
            .catch(error => console.log(error))

        setLastID(id)
    }

    return ( 
        <NotebooksContext.Provider value={{
            notebooks: notebooks, 
            loading: loading, 
            addNotebook: addNotebookHandler, 
            lastId: lastID, 
            deleteNotebook: deleteNotebookHandler
        }}>
            {children}
        </NotebooksContext.Provider>
     );
}
 
export default NotebooksContextProvider;