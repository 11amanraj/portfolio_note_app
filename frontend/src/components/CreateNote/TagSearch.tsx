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
        if(e.target.value.length > 0) {
            newTags = [e.target.value, ...allTags]
        } else {
            newTags = [...allTags]
        }
        setTags(newTags.filter(tag => tag.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    const selectionHandler = (id: string) => {
        const selection = [...selectedTags]
        selection.push(id)
        setSelectedTags(selection)
        setShowList(false)
    }

    //create better key for both arra.map functions
    return ( 
        <>
            <span className={styles.tag}>
                {selectedTags.map(tag => <Tags key={tag} tag={tag}/>)}
            </span>
            <div className={styles.container}>
                <label htmlFor='tag'>Add Tag:</label>
                <input name='tag' type='text' onChange={inputHandler}/>
                
                {showList && <div className={styles.list}>
                  {tags.map(item => <div onClick={() => selectionHandler(item)} key={item}>{item}</div>)}
                </div>}
            </div>
        </>
     );
}
 
export default Search;