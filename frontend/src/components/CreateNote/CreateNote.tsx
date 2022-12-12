import React from 'react'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import styles from './CreateNote.module.css'
import Search from './TagSearch'

interface note {
    id: number,
    tags: string[],
    title: string,
    body: string
}

const CreateNote = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState<string[]>([])
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
        console.log('new note added')
    }

    useEffect(() => {
        axios.get('http://localhost:3001/notebooks')
            .then(response => {
                const arr = Object.keys(response.data).map(key => (
                    response.data[key].map((item: note) => item.tags) 
                )).flat(2)
                const set: any = new Set(arr)
                setTags([...set])
            })
            .catch(error => console.log(error))
    }, [])

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
                    <Search allTags={tags}/>

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