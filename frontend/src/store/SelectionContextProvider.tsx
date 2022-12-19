import React from 'react'
import SelectionContext from './selection-context'
import { useState } from 'react'
import { note } from '../shared/interfaces/notes'

const SelectionContextProvider = ({children}: {children: React.ReactNode}) => {
    const [type, setType] = useState<string>('')
    const [selected, setSelected] = useState<note[] | null>(null)
    const [lastNotebook, setLastNotebook] = useState<note[] | null>(null)

    const selectElementHandler = (type: string, selected: note[]) => {
        if (type === 'notebook') {
            setType(type)
            setSelected(selected)
            setLastNotebook(selected)
        } else if (type === 'note') {
            setType(type)
            setSelected(selected)
        }
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