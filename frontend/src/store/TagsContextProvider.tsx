import { tag } from "../shared/interfaces/notes";
import React, { ReactNode, useState, useEffect } from 'react'
import axios from "axios";

interface tagNote {
    id: string,
    title: string
}

interface tagCollection extends tag {
    notes: tagNote[]
}

interface tagContext {
    allTags: tagCollection[] | null,
    loading: boolean
}

const defaultValue: tagContext = {
    allTags: [
        {
            name: '',
            id: '',
            notes: [
                {
                    id: '',
                    title: ''
                }
            ]
        }
    ],
    loading: false
}

export const TagContext = React.createContext(defaultValue)

const TagContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [allTags, setAllTags] = useState<tagCollection[] | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios
            .get('http://localhost:8000/api/tags')
            .then(response => {
                setAllTags(response.data)
                setLoading(false)
            }).catch(error => console.log(error))
    }, [])

    return ( 
        <TagContext.Provider value={{ allTags: allTags, loading: loading }}>
            {children}
        </TagContext.Provider>
     );
}
 
export default TagContextProvider;