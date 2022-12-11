import { useState, useRef } from 'react'
import styles from './CreateNote.module.css'

const CreateNote = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const titleInputRef = useRef<HTMLInputElement | null>(null)
    const bodyInputRef = useRef<HTMLTextAreaElement | null>(null)

    // const bodyInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.value)
    // const titleInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.value)

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        titleInputRef.current && setTitle(titleInputRef.current?.value)
        bodyInputRef.current && setBody(bodyInputRef.current?.value)
        console.log('new note added')
    }

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

                <button type="submit">Add Note</button>
            </fieldset>
        </form>
     );
}
 
export default CreateNote;