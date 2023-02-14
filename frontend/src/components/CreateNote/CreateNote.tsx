import React from 'react'
import { useState, useRef, useContext } from 'react'
import styles from './CreateNote.module.css'
// import Search from './TagSearch'
import axios from 'axios'
import DropDown from '../UI/DropDown'
import { NotebooksContext } from '../../store/NotebooksContextProvider'

const CreateNote = () => {
    // const [title, setTitle] = useState('')
    // const [body, setBody] = useState('')
    const [selectedNotebook, setSelectedNotebook] = useState('')

    const titleInputRef = useRef<HTMLInputElement | null>(null)
    const bodyInputRef = useRef<HTMLTextAreaElement | null>(null)

    const { notebooks, addNotebook } = useContext(NotebooksContext)

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        if(selectedNotebook.length > 0) {
            e.preventDefault()
            // titleInputRef.current && setTitle(titleInputRef.current?.value)
            // bodyInputRef.current && setBody(bodyInputRef.current?.value)
    
            // console.log({
            //     title: titleInputRef.current?.value,
            //     body: bodyInputRef.current?.value
            // })
            // console.log('new note added')
    
            const newNote = {
                title: titleInputRef.current?.value,
                content: bodyInputRef.current?.value,
                author: "John Doe",
                notebookID: selectedNotebook
            }
            
            axios
                .post('http://localhost:8000/api/notes', newNote)
                .then(response => console.log(response))
        }
    }

    const notebookSelectionHandler = (id: string) => {
        setSelectedNotebook(id)
    }

    return (
        <form className={styles.container} onSubmit={submitHandler}>
            <fieldset>
                <legend><h2>Create New Note</h2></legend>
                
                <div className={styles.title}>
                    <label htmlFor='title'>Title:</label>
                    <input type='text' name='title' id='title-input' ref={titleInputRef}/>
                </div>

                <div className={styles.dropdown}>
                    <label htmlFor='notebook'>Notebook:</label>
                    {notebooks && <DropDown onSelect={notebookSelectionHandler} addEntry={addNotebook} array={notebooks}/>} 
                </div>

                <label htmlFor='body'>Body:</label>
                <textarea name='body' id='body-input' ref={bodyInputRef}/>
                {/* <Search allTags={noteCtx.tags}/> */}

                <div className={styles.buttons}>
                    <button id={styles.submit} type="submit">Add Note</button>
                </div>
            </fieldset>
        </form>
    )

}
 
export default CreateNote;