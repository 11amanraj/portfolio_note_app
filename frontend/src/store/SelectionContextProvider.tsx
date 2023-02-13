import { TypeofSelection } from "../shared/interfaces/notes";
import SelectionContext from "./selection-context";
import { useState } from 'react'

const SelectionContextProvider = ({children}: {children: React.ReactNode}) => {
    const [type, setType] = useState<TypeofSelection>(TypeofSelection.WELCOME)
    const [selected, setSelected] = useState<string | null>(null)
    const [lastNotebook, setLastNotebook] = useState<string | null>(null)


    const SelectElementHandler = (type: TypeofSelection, id: string) => {
        setType(type)
        
        if (type === TypeofSelection.NOTEBOOK) {
            setSelected(id)
            setLastNotebook(id)
        } else if (type === TypeofSelection.NOTE) {
            setSelected(id)
        } else if (type === TypeofSelection.CREATENOTE) {
            setSelected(null)
        }
    }

    return ( 
        <SelectionContext.Provider value={{
            type: type,
            selected: selected,
            lastNotebook: lastNotebook,
            onSelect: SelectElementHandler
        }}>
            {children}
        </SelectionContext.Provider>
     );
}
 
export default SelectionContextProvider;