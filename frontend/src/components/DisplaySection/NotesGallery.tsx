import styles from './NotesGallery.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { CollectionType, note } from '../../shared/interfaces/notes'
import Loading from '../UI/Loading';
import { Link } from 'react-router-dom'
import Filter from '../Operations/Filter';

const NotesGallery: React.FC<{id: string | undefined, url: string, type: string}> = ({id, url, type}) => {
    const [notes, setNotes] = useState<note[]>([])
    const [loading, setLoading] = useState(false)
    const [rerender, setRerender] = useState<number>(0)
    const [link, setLink] = useState('')

    useEffect(() => {
        setLoading(true)
        axios
            .get(url)
            .then(response => {
                if(type === CollectionType.NOTEBOOK) {
                    setNotes(response.data.notes)
                    setLink(`/notebook/${response.data.id}/note/`)
                } else if (type === CollectionType.IMPORTANT) {
                    setNotes(response.data)
                }
                setLoading(false)
            })
    }, [id, rerender, type, url])

    const pinNoteHandler = (pinStatus: boolean, e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault()
        e.stopPropagation()

        axios
            .put(`http://localhost:8000/api/notes/${id}`, {
                pinned: !pinStatus,
                dateModified: new Date()
            })
            .then(response => {
                setRerender(Math.random())
            })
    }

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.length > 0) {
            if (type === CollectionType.IMPORTANT) {
                axios
                    .get(`http://localhost:8000/api/notes/search/${e.target.value}`)
                    .then(notes => setNotes(notes.data))
            } else {
                axios
                    .get(`http://localhost:8000/api/notebooks/${id}/search/${e.target.value}`)
                    .then(notebook => setNotes(notebook.data.notes))
            }
        }
    }

    if (loading) return <Loading />

    return (
        <div className={styles.container}>
            <input onChange={inputHandler} type='text' placeholder='Search Notebook'/>
            <div className={styles.allnotes}>
                {notes.map(note => (
                    <Link key={note.id} 
                        to={type === CollectionType.IMPORTANT 
                            ? `/notebook/${note.notebook}/note/${note.id}`
                            : `${link}${note.id}`}>
                        <div className={styles.note}>
                            <div>
                                <h2>{note.title}</h2>
                                <p>{`by ${note.author}`}</p>
                                <p>{note
                                    .dateCreated
                                    .toString()
                                    .split('T')[0]
                                    .split('-')
                                    .reverse()
                                    .join('-')}
                                </p>
                                <button onClick={(e) => pinNoteHandler(note.pinned, e, note.id)}>
                                    {note.pinned ? 'Unpin Note' : 'Pin Note'}
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )

}
 
export default NotesGallery;