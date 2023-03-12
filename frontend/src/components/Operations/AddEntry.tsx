import styles from './AddEntry.module.css'
import { useContext, useRef } from 'react'
import { MessageContext } from '../../store/MessageContextProvider'

const AddEntry: React.FC<{addEntry: (title: string) => Promise<boolean>}> = ({addEntry}) => {
    // common component for both input field for new note and notebook in sidebar
    const inputRef = useRef<HTMLInputElement | null>(null)

    const clearInputHandler = () => {
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    const submitHandler = async () => {
        if(inputRef.current) {
            const request = await addEntry(inputRef.current?.value)
            if(request) {
                inputRef.current.value = ''
            } else {
                inputRef.current.focus()
            }
        }
    }

    return (
        <div className={styles.container}>
            <input ref={inputRef} type='text' placeholder='Add New Notebook' name='add-entry' id='add-entry-input'/>
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