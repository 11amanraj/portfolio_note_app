import { useAppSelector } from '../../store/storeHooks';
import Search from '../Operations/Search';
import DropDown from '../UI/DropDown';
import styles from './Navbar.module.css'
import { useState } from 'react'

const Navbar = () => {
    const [isScrolling, setIsScrolling] = useState(false)

    const notebooks = useAppSelector(state => state.notebooks)

    const selectNotebookHandler = () => {

    }

    return ( 
        <nav className={`${styles.container} ${isScrolling ? styles.scroll : ''}`}>
            <h1>NotesApp</h1>
            <button onClick={() => setIsScrolling(prev => !prev)}>Change navbar</button>
            <div className={styles.dropdown}>
                <DropDown array={notebooks} onSelect={selectNotebookHandler}/>
                {/* <ul>List of All Notebooks</ul> */}
                <ul>List of Notes</ul>
            </div>
            <input placeholder='Search Database'/>
        </nav>
     );
}
 
export default Navbar;