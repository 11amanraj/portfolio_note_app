import styles from './DropDown.module.css'
import { useState } from 'react'

interface DropDownElement {
    title: string,
    id: string
}

const DropDown: React.FC<{ 
        array: DropDownElement[], 
        addEntry: (title: string) => void, 
        onSelect: (id: string) => void 
    }> = ({ array, addEntry, onSelect }) => {
    
    const [input, setInput] = useState<string>('')
    const [showOptions, setShowOptions] = useState(false)

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const newEntryHandler = () => {
        console.log('working')
        const id = addEntry(input)
        console.log(id)
        
        // setShowOptions(false)
    }

    const selectionHandler = (id: string, title: string) => {
        onSelect(id)
        setShowOptions(false)
        setInput(title)
    }

    // add a close options button

    return (
        <div className={styles.container}>
            <input
                onFocus={() => setShowOptions(true)}
                onChange={inputHandler}
                className={styles.input} type='text' name='input-box' id='input-box'
                value={input}
            />
            {showOptions &&
                <div className={styles.dynamic}>
                    {input.length > 0 && <p className={styles.new}>
                        <span>{input}</span>
                        <span onClick={newEntryHandler} className={styles.add}>+</span>
                    </p>}
                    {array
                        .filter(item => item.title.includes(input))
                        .map(item =>
                            <p onClick={() => selectionHandler(item.id, item.title)} key={item.id}>{item.title}</p>
                        )}
                </div>}
        </div>
    );
}

export default DropDown;