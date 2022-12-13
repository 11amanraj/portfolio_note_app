import { useState } from 'react'
import styles from './TagSearch.module.css'
import Tags from '../UI/Tags'

const Search: React.FC<{allTags: string[]}> = ({allTags}) => {
    const [tags, setTags] = useState(allTags)
    const [showList, setShowList] = useState(false)
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowList(true)
        let newTags

        //check if e.target.value is not empty
        if(e.target.value.length > 0) {
            newTags = [e.target.value, ...allTags]
        } else {
            newTags = [...allTags]
        }
        setTags(newTags.filter(tag => tag.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    //simplify logic later
    //also update list of all tags incase of new tag
    const selectionHandler = (text: string) => {
        const selection = [...selectedTags]
        let selectedText = text.toLowerCase()

        //ensures already existing tags are given priority in naming
        if(allTags.filter(tag => tag.toLowerCase() === selectedText).length > 0) {
            selectedText = allTags.filter(tag => tag.toLowerCase() === selectedText)[0]
        }

        //checks if no duplicate tags are selected
        if(selection.filter(tag => tag.toLowerCase() === selectedText.toLowerCase()).length === 0) {
            selection.push(selectedText)
            setSelectedTags(selection)
            setShowList(false)
        } else {
            setShowList(false)
        }
    }

    const deleteHandler = (id: string) => {
        const tagsArr = [...selectedTags]
        setSelectedTags(tagsArr.filter(tag => tag !== id))
    }

    //create better key for both arra.map functions
    return ( 
        <>
            <span className={styles.tag}>
                {selectedTags.map(tag => <Tags onDelete={() => deleteHandler(tag)} key={tag} tag={tag}/>)}
            </span>
            <div className={styles.container}>
                <label htmlFor='tag'>Add Tag:</label>
                <input name='tag' type='text' onChange={inputHandler}/>
                
                {(tags.length > 0) && showList && <div className={styles.list}>
                  {tags.map(item => <div onClick={() => selectionHandler(item)} key={item}>{item}</div>)}
                </div>}
            </div>
        </>
     );
}
 
export default Search;