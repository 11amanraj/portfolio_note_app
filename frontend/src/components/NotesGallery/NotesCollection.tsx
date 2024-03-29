import styles from './NotesCollection.module.css'
import SingleNote from './SingleNote';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CollectionType, note, tag } from '../../shared/interfaces/notes';
import Tags from '../Tags/Tags';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

const NotesCollection: React.FC<{type: string, 
        url: string, 
        renderComponent: boolean,
        description?: {title: string},
    }> = ({type, url, renderComponent, description}) => {
    const [notes, setNotes] = useState<note[]>([{
        title: '',
        content: '',
        id: '',
        dateCreated: new Date(0),
        dateModified: new Date(0),
        pinned: false,
        stringDateCreated: '',
        stringDateModified: ''
    }])
    const [title, setTitle] = useState<string>('')
    const [tags, setTags] = useState<tag[]>([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const user = useSelector((state: any) => state.user)

    useEffect(() => {
        if(description) {
            setTitle(description.title)
        }
    }, [description])

    // useEffect(() => {
    //     if(renderComponent) {
    //         setLoading(true)
    //         axios
    //             .get(url, {
    //                 headers: {
    //                   'Authorization': user.token
    //                 }
    //               })
    //             .then(response => {
    //                 if(type === CollectionType.NOTEBOOK) {
    //                     setTags(response.data.tags)
    //                     setTitle(response.data.title)
    //                     setNotes(response.data.notes)
    //                     // setLink(`/notebook/${response.data.id}/note/`)
    //                 } else if (type === CollectionType.IMPORTANT) {
    //                     setTitle('Important Notes')
    //                     setNotes(response.data)
    //                 }
    //                 setLoading(false)
    //             })
    //     }
    // }, [type, url])

    const addNoteHandler = () => {
        const notebookId = url.split('/')[5]
            
        const newNote = {
            title: 'Untitled Note',
            content: '',
            author: "John Doe",
            notebookID: notebookId
        }
        
        axios
            .post('http://localhost:8000/api/notes', newNote)
            .then(response => {
                // rerenderComponent(true)
                // messageHandler(false , `${response.data.title} added !`)
                navigate(`/notebook/${notebookId}/note/${response.data.id}`, {state:{edit: true}})
            })
            .catch(error => console.log(error))

        console.log(`Note Added to ${notebookId}`)
    }

    const allTags = () => {
        return (
            <>
                {tags.map(tag => <Tags key={tag.id} tag={tag} active={true} />)}
            </>
        )
    }

    return ( 
        <section className={styles.container}>
            <div className={styles.backdrop}>
                <div className={styles.title}>
                    <div className={styles.bgd}>
                    </div>
                    <div className={styles.text}>
                        <h3>{title}</h3>
                        <p>Today</p>
                        {type === CollectionType.NOTEBOOK ? allTags() : <div>Tags</div>}
                    </div>
                </div>
                {type === CollectionType.NOTEBOOK && 
                    <div className={styles.add}>
                        <div className={styles.inner} onClick={addNoteHandler}>
                            Add Note
                        </div>
                    </div>}
                {notes.length > 0 && notes.map(note => <SingleNote note={note} key={note.id} id={note.id}/>)}
            </div>
        </section>
     );
}
 
export default NotesCollection;