import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { notebook, notebookContext } from "../shared/interfaces/notes";

const defaultValue : notebookContext = {
    notebooks: null,
    loading: false
}

export const NotebooksContext = React.createContext(defaultValue)

const NotebooksContextProvider = ({children}: {children: React.ReactNode}) => {
    const [notebooks, setNotebooks] = useState<notebook[] | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios
            .get('http://localhost:8000/api/notebooks')
            .then(response => {
                setNotebooks(response.data)
                setLoading(false)
            })
    }, [])

    return ( 
        <NotebooksContext.Provider value={{notebooks: notebooks, loading: loading}}>
            {children}
        </NotebooksContext.Provider>
     );
}
 
export default NotebooksContextProvider;