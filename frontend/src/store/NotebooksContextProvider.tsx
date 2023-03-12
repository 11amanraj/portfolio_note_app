import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { notebook } from "../shared/interfaces/notes";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "./MessageContextProvider";

interface notebookContext {
    notebooks: null | notebook[],
    loading: boolean,
    addNotebook: (title: string) => Promise<boolean>,
    deleteNotebook: (id: string) => void,
    lastId: string,
    rerenderComponent: (rerender: boolean) => void
}

const defaultValue : notebookContext = {
    notebooks: null,
    loading: false,
    addNotebook: async (title: string) => true,
    deleteNotebook: (id: string) => {},
    lastId: '',
    rerenderComponent: (rerender: boolean) => {}
}

export const NotebooksContext = React.createContext(defaultValue)

const NotebooksContextProvider = ({children}: {children: React.ReactNode}) => {
    const { messageHandler } = useContext(MessageContext)

    const [notebooks, setNotebooks] = useState<notebook[] | null>(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

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

    const addNotebookHandler = async (title: string) => {
        try {
            const response = await axios.post('http://localhost:8000/api/notebooks', {title: title})
            
            setLastID(response.data.id)
            navigate(`/notebook/${response.data.id}`)
            messageHandler(false, `${title} added!`)
            // returns true if request is successful
            return true
        } catch(error: any) {
            messageHandler(true, error.response.data)
            // returns false if request not successful
            return false

        }
    }

    const deleteNotebookHandler = (id: string) => {
        axios
            .delete(`http://localhost:8000/api/notebooks/${id}`)
            .then(response => {
                setLastID(Math.random().toString())
                navigate('/')
            })
            .catch(error => console.log(error))
    }

    const rerenderHandler = (rerender: boolean) => {
        if(rerender === true) {
            setLastID(Math.random().toString())
        }
    }

    return ( 
        <NotebooksContext.Provider value={{
            notebooks: notebooks, 
            loading: loading, 
            addNotebook: addNotebookHandler, 
            lastId: lastID, 
            deleteNotebook: deleteNotebookHandler,
            rerenderComponent: rerenderHandler
        }}>
            {children}
        </NotebooksContext.Provider>
     );
}
 
export default NotebooksContextProvider;