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
    allTags: tagCollection[] | null
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
    ]
}

export const TagContext = React.createContext(defaultValue)

const TagContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [allTags, setAllTags] = useState<tagCollection[] | null>(null)

    // useEffect(() => {
    //     axios
    //         .get('http://localhost:8000/api/tags')
    //         .then(response => {
    //             setAllTags(response.data)
    //         }).catch(error => console.log(error))
    // }, [])

    return ( 
        <TagContext.Provider value={{ allTags: allTags }}>
            {children}
        </TagContext.Provider>
     );
}
 
export default TagContextProvider;