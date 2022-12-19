import React from "react";
import { notebook, note } from "../shared/interfaces/notes";

interface selection {
    type: string,
    selected: note[] | note | null,
    lastNotebook: note[] | null,
    onSelect: (type: string, selected: note[] | note, lastNotebook: note[]) => void
}

const defaultValue: selection = {
    type: '',
    selected: [],
    lastNotebook: [],
    onSelect: () => {}
}

const SelectionContext = React.createContext(defaultValue)

export default SelectionContext