import styles from './DropDown.module.css'
import { useState } from 'react'

interface DropDownElement {
    title: string,
    id: string
}

const DropDown: React.FC<{array: DropDownElement[]}> = ({array}) => {
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
                    {array.map(item => <p key={item.id}>{item.title}</p>)}
                </div>}
        </div>
     );
}
 
export default DropDown;