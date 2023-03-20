import React from 'react'
import NotesGallery from '../components/DisplaySection/NotesGallery';
import SideBar from '../components/Navigation/Sidebar';
import AllNotes from '../components/NotesGallery/AllNotes';
import NotesCollection from '../components/NotesGallery/NotesCollection';
import { CollectionType } from '../shared/interfaces/notes';
import styles from './Style.module.css'

const HomePage = () => {
    const url = 'http://localhost:8000/api/notes/important'

    return ( 
        <>
            {/* <SideBar />
            <div> */}
                <AllNotes />
                {/* <NotesGallery type={CollectionType.IMPORTANT} url={url} id='asgsdg'/> */}
            {/* </div> */}
        </>
     );
}
 
export default HomePage;