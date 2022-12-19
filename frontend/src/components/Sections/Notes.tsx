import styles from './Notes.module.css'
import NotesSection from './NotesSection';
import SideBar from './SideBar';
// import { useState } from 'react';
// import { note } from '../../shared/interfaces/notes';

const Notes = () => {   
    return ( 
        <div className={styles.container}>
            <SideBar/>
            <NotesSection/>
        </div>
     );
}
 
export default Notes;