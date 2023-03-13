import React from 'react'
import NotesGallery from '../components/DisplaySection/NotesGallery';
import { CollectionType } from '../shared/interfaces/notes';

const HomePage = () => {
    const url = 'http://localhost:8000/api/notes/important'

    return ( 
        <div style={{width: "100%", height: "100vh"}}>
            Please Select A Notebook
            <NotesGallery type={CollectionType.IMPORTANT} url={url} id='asgsdg'/>
        </div>
     );
}
 
export default HomePage;