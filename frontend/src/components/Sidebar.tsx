import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Sidebar.module.css'
import NotebookSidebar from './NotebookSidebar';

const SideBar = () => {

    interface note {
        title: string;
        content: string;
        author: string;
        id: string;
    }
    
    interface notebook {
        title: string;
        notes: note[]
        id: string;
    }

    const [notebooks, setNotebooks] = useState<notebook[] | null>(null)
    const [notes, setNotes] = useState<note[] | null>(null)

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/notebooks')
            .then(response => 
                setNotebooks(response.data)
            )
    }, [])

    // notebooks && console.log(notebooks[0])
    // notebooks && console.log(notebooks[0].notes)

    const titleSelectionHandler = (id: string) => {
        const selectedNotebook = notebooks?.filter(notebook => notebook.id === id)
        selectedNotebook && setNotes((selectedNotebook[0]).notes)
    }

    console.log(notes)

    return ( 
        <div className={styles.container}>
            {/* <NotebookSidebar /> */}
            {notebooks && notebooks.map(notebook => <p onClick={() => titleSelectionHandler(notebook.id)} key={notebook.id}>{notebook.title}</p>)}
        </div>
     );
}
 
export default SideBar;
