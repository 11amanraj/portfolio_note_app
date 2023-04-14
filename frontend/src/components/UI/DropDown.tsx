import styles from './DropDown.module.css'
import { useState } from 'react'

interface DropDownElement {
    title: string,
    id: string
}

const DropDown: React.FC<{ 
        array: DropDownElement[], 
        addEntry?: (title: string) => void, 
        onSelect: (id: string) => void 
    }> = ({ array, addEntry, onSelect }) => {
    
    const [input, setInput] = useState<string>('')
    const [showOptions, setShowOptions] = useState(false)
    const [selectedElement, setSelectedElement] = useState<DropDownElement>({
        title: '',
        id: ''
    })

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const newEntryHandler = () => {
        console.log('working')
        // const id = addEntry(input)
        // console.log(id)
        
        // setShowOptions(false)
    }

    const selectionHandler = (id: string, title: string) => {
        onSelect(id)
        setShowOptions(false)
        setInput(title)
    }

    const showOptionsHandler = () => {
        setShowOptions(prev => !prev)
    }

    const selectOptionHandler = (element: DropDownElement) => {
        setSelectedElement(element)
    }

    const notebooks = [
        {
            id: '0',
            title: 'First Notebook'
        },
        {
            id: '1',
            title: 'Second Notebook'
        },
        {
            id: '2',
            title: 'Third Notebook'
        },
    ]

    // add a close options button

    return (
        <div className={styles.container}>
            <div 
                aria-controls='list'
                aria-expanded={showOptions}
                aria-haspopup='listbox'
                id='list-header'
                role='combobox'
                tabIndex={0}
                className={styles.header}
                aria-activedescendant={selectedElement.id.length > 0 ? selectedElement.id : ''}
                onClick={showOptionsHandler}   
            >{selectedElement.id.length > 0 ? selectedElement.title : 'Select A Notebook'}</div>
            {showOptions && <div 
                id='list'
                role='listbox'
                tabIndex={-1}
                className={styles.list}
            >
                {notebooks.map(notebook => (
                         <div role="option" 
                             id={notebook.id}
                             key={notebook.id}
                             aria-selected={notebook.id === selectedElement.id}
                             className={`${styles.item} ${notebook.id === selectedElement.id ? styles.selected : ''}`}
                             onClick={() => selectOptionHandler(notebook)}
                         >{notebook.title}</div>
                     ))}
            </div>}
        </div>
    )

    // return (
    //     <>
    //         <label 
    //             id="combo1-label" 
    //             className={styles.label}
    //         >Select Notebook</label>
    //         <div 
    //             // class="combo js-select"
    //         >
    //             <div 
    //                 aria-controls="listbox1" 
    //                 aria-expanded="false" 
    //                 aria-haspopup="listbox" 
    //                 aria-labelledby="combo1-label" 
    //                 id="combo1" 
    //                 // class="combo-input" 
    //                 role="combobox" 
    //                 tabIndex={0}
    //             ></div>
    //             <div 
    //                 // class="combo-menu" 
    //                 role="listbox" 
    //                 id="listbox1" 
    //                 aria-labelledby="combo1-label" 
    //                 tabIndex={-1}
    //             >
    //                 <div role="option" 
    //                         id="combo1-0" 
    //                         // class="combo-option option-current" 
    //                         aria-selected="true"
    //                     >Choose a Notebook</div>
    //                 {notebooks.map(notebook => (
    //                     <div role="option" 
    //                         id="combo1-0" 
    //                         // class="combo-option option-current" 
    //                         aria-selected="true"
    //                     >{notebook.title}</div>
    //                 ))}
    //             </div>
    //         </div>
    //     </>
    // )

    // return (
    //     <div className={styles.container}>
    //         {/* <input
    //             onFocus={() => setShowOptions(true)}
    //             onChange={inputHandler}
    //             className={styles.input} type='text' name='input-box' id='input-box'
    //             value={input}
    //         /> */}
    //         <h3 onClick={showOptionsHandler}>All Notebooks</h3>
    //         {showOptions &&
    //             <div className={styles.dynamic}>
    //                 {input.length > 0 && <p className={styles.new}>
    //                     <span>{input}</span>
    //                     <span onClick={newEntryHandler} className={styles.add}>+</span>
    //                 </p>}
    //                 {array
    //                     .filter(item => item.title.includes(input))
    //                     .map(item =>
    //                         <p onClick={() => selectionHandler(item.id, item.title)} key={item.id}>{item.title}</p>
    //                     )}
    //             </div>}
    //     </div>
    // );
}

export default DropDown;