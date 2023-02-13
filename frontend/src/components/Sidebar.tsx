import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styles from './Sidebar.module.css'
import { notebook, TypeofSelection } from '../shared/interfaces/notes';
import SelectionContext from '../store/selection-context';

const SideBar: React.FC<{onSelect: (selectedBook: notebook) => void}> = ({onSelect}) => {
    const [notebooks, setNotebooks] = useState<notebook[] | null>(null)
    const selectCtx = useContext(SelectionContext)

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/notebooks')
            .then(response => 
                setNotebooks(response.data)
            )
    }, [])

    const titleSelectionHandler = (id: string) => {
        const selectedNotebook = notebooks?.filter(notebook => notebook.id === id)
        selectedNotebook && onSelect(selectedNotebook[0])
        
        selectCtx.onSelect(TypeofSelection.NOTEBOOK, id)
    }

    return ( 
        <div className={styles.container}>
            {notebooks && notebooks.map(notebook => <p onClick={() => titleSelectionHandler(notebook.id)} key={notebook.id}>{notebook.title}</p>)}
        </div>
     );
}
 
export default SideBar;
