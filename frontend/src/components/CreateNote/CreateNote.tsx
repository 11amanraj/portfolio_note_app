import React from 'react'
import { useState, useRef, useContext } from 'react'
import styles from './CreateNote.module.css'
import Search from './TagSearch'
import NoteContext from '../../store/note-context'

const CreateNote = () => {
    const noteCtx = useContext(NoteContext);

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [showForm, setShowForm] = useState<boolean>(false)
    const titleInputRef = useRef<HTMLInputElement | null>(null)
    const bodyInputRef = useRef<HTMLTextAreaElement | null>(null)

    const showFormHandler = () => {
        setShowForm(prev => !prev)
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        titleInputRef.current && setTitle(titleInputRef.current?.value)
        bodyInputRef.current && setBody(bodyInputRef.current?.value)
        showFormHandler()
        console.log({
            title: titleInputRef.current?.value,
            body: bodyInputRef.current?.value
        })
        console.log('new note added')
    }

    if(showForm) {
        return (
            <form className={styles.container} onSubmit={submitHandler}>
                <fieldset>
                    <legend><h2>Create New Note</h2></legend>
                    
                    <div>
                        <label htmlFor='title'>Title:</label>
                        <input type='text' name='title' id='title-input' ref={titleInputRef}/>
                    </div>

                    <label htmlFor='body'>Body:</label>
                    <textarea name='body' id='body-input' ref={bodyInputRef}/>
                    <Search allTags={noteCtx.tags}/>

                    <div>
                        <button id={styles.submit} type="submit">Add Note</button>
                        <button id={styles.cancel} onClick={showFormHandler}>Cancel</button>
                    </div>
                </fieldset>
            </form>
        )
    } else {
        return (
            <button id={styles.create} onClick={showFormHandler}>Create Note</button>
        )
    }
}
 
export default CreateNote;