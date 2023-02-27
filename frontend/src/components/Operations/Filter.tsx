import { useState, useRef } from 'react';
import styles from './Filter.module.css'

const Filter = () => {
    const [showResult, setShowResult] = useState(false)
    const [input, setInput] = useState('')

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.length > 0) {
            setShowResult(true)
            setInput(e.target.value)
        } else {
            setShowResult(false)
        }
    }

    return ( 
        <>
            <input type='text' 
                    placeholder='Search Your Notes' 
                    name='search' 
                    id='search-input'
                    onChange={inputHandler}
            />
            {showResult && 
                <div className={styles.container}>
                    Working
                </div>
            }
        </>
     );
}
 
export default Filter;