import styles from './DropDown.module.css'
import { useState } from 'react'

const DropDown = () => {
    const notebooks = [
        {
            title: 'Untitled Notebook',
            id: 'abfg56g4d65fh'
        },
        {
            title: '2nd Notebook',
            id: 'ahgusdhg8564gs'
        }
    ]

    const [input, setInput] = useState<string>('')
    const [showOptions, setShowOptions] = useState(false)

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    return ( 
        <div className={styles.container}>
            <input 
                onFocus={() => setShowOptions(true)} 
                onBlur={() => setShowOptions(false)} 
                onChange={inputHandler} 
                className={styles.input} type='text' name='input-box' id='input-box'
            />
            {showOptions && 
                <div className={styles.dynamic}>
                    {input.length > 0 && <p className={styles.new}>
                                                <span>{input}</span>
                                                <span className={styles.add}>+</span>
                                        </p>}
                    <p>{notebooks[0].title}</p>
                    <p>{notebooks[1].title}</p>
                </div>}
        </div>
     );
}
 
export default DropDown;