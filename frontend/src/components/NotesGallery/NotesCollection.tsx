import styles from './NotesCollection.module.css'
import SingleNote from './SingleNote';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CollectionType, note, tag } from '../../shared/interfaces/notes';
import Tags from '../UI/Tags';

const NotesCollection: React.FC<{type: string, url: string}> = ({type, url}) => {
    const [notes, setNotes] = useState<note[]>([{
        title: '',
        content: '',
        author: '',
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

    useEffect(() => {
        setLoading(true)
        axios
            .get(url)
            .then(response => {
                if(type === CollectionType.NOTEBOOK) {
                    setTags(response.data.tags)
                    setTitle(response.data.title)
                    setNotes(response.data.notes)
                    // setLink(`/notebook/${response.data.id}/note/`)
                } else if (type === CollectionType.IMPORTANT) {
                    setTitle('Important Notes')
                    setNotes(response.data)
                } else if (type === CollectionType.TAG) {
                    setTitle(response.data.name)
                    setNotes(response.data.notes)
                }
                setLoading(false)
            })
    }, [type, url])

    const allTags = () => {
        const selectHandler = () => {
            console.log('clicked')
        }

        console.log(tags)

        return (
            <>
                {tags.map(tag => <Tags onSelect={selectHandler} key={tag.id} tag={tag.name} active={true} />)}
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
                        {/* <div>Tags</div> */}
                        {type === CollectionType.NOTEBOOK ? allTags() : <div>Tags</div>}
                    </div>
                </div>
                {notes.map(note => <SingleNote key={note.id} id={note.id}/>)}
            </div>
        </section>
     );
}
 
export default NotesCollection;