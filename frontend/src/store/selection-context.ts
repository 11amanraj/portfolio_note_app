import React from "react"
import { selection, TypeofSelection } from "../shared/interfaces/notes"

const defaultValue: selection = {
    type: TypeofSelection.WELCOME,
    selected: null,
    lastNotebook: null,
    onSelect: (type: TypeofSelection, id: string) => {}
}

const SelectionContext = React.createContext(defaultValue)

export default SelectionContext