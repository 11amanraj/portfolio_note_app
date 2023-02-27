import styles from './AddEntry.module.css'
import { useRef } from 'react'

const AddEntry: React.FC<{addEntry: (title: string) => void}> = ({addEntry}) => {
    // common component for both input field for new note and notebook in sidebar
    const inputRef = useRef<HTMLInputElement | null>(null)

    const clearInputHandler = () => {
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    const submitHandler = () => {
        if(inputRef.current) {
            addEntry(inputRef.current?.value)
            inputRef.current.value = ''
        }
    }

    return (
        <div className={styles.container}>
            <input ref={inputRef} type='text' placeholder='Add New Notebook' name='add-notebook' id='add-notebook-input'/>
            <div className={styles.btns}>
                <button onClick={submitHandler}>
                    Add Note
                </button>
                <button onClick={clearInputHandler}>
                    Clear
                </button>
            </div>
        </div>
    );
}

export default AddEntry;