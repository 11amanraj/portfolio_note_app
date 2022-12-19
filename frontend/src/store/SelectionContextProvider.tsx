import React from 'react'
import SelectionContext from './selection-context'
import { useState } from 'react'
import { notebook, note } from '../shared/interfaces/notes'

const SelectionContextProvider = ({children}: {children: React.ReactNode}) => {
    const [type, setType] = useState<string>('')
    const [selected, setSelected] = useState<note[] | note | null>(null)
    const [lastNotebook, setLastNotebook] = useState<note[] | null>(null)

    const selectElementHandler = (type: string, selected: note[] | note, lastNotebook: note[]) => {
        setType(type)
        setSelected(selected)
        setLastNotebook(lastNotebook)
        console.log('working')
    }

    return (
        <SelectionContext.Provider value={{
            type: type,
            selected: selected,
            lastNotebook: lastNotebook,
            onSelect: selectElementHandler
        }}>
            {children}
        </SelectionContext.Provider>
    )
}

export default SelectionContextProvider