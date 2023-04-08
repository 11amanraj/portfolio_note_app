import { notebook } from '../../shared/interfaces/notes';
import styles from './Notebook.module.css'
import { useState } from 'react'

const Notebook = () => {
    const [notebook, setNotebook] = useState<notebook>({
        id: '',
        title: '',
        notes: []
    })
    return ( 
        <section className={styles.container}>

        </section>
     );
}
 
export default Notebook;