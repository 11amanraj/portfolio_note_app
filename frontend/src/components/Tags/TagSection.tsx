import styles from './TagSection.module.css'
import Tags from '../UI/Tags';
import { tag } from '../../shared/interfaces/notes';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { TagContext } from '../../store/TagsContextProvider';

const TagSection: React.FC<{
        onSelect: (tag: tag, editing: boolean) => void , 
        onRemove?: (tag: tag) => void, 
        editing: boolean , 
        tags: tag[] | undefined
    }> = ({onSelect, onRemove, editing, tags}) => {
    const [input, setInput] = useState('')
    const [existingTags, setExistingTags] = useState<tag[] | null>(null)
    const [showAllTags, setShowAllTags] = useState(false)

    const { allTags } = useContext(TagContext)

    useEffect(() => {
        allTags && setExistingTags([...allTags])
    }, [allTags])
    
    const editMode = () => {
        const inactiveTags = (biggerArray: tag[], smallerArray: tag[]) => {
            const smallerArrayIDs = smallerArray.map(tag => tag.id)
            return biggerArray
                .filter(tag => !smallerArrayIDs.includes(tag.id))
        }

        const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value)
        }

        const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                try {
                    const response = await axios
                        .post('http://localhost:8000/api/tags', {
                            name: e.currentTarget.value
                        })
                    if(existingTags) {
                        const newTags = [...existingTags, response.data]
                        setExistingTags(newTags)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
          }

        return (
            <>
                <button onClick={() => setShowAllTags(prev => !prev)}>Add New Tag</button>
                {showAllTags && 
                    <div className={styles.editing}>
                        <input type='text' 
                            onChange={changeHandler} 
                            onKeyDown={handleKeyDown} 
                            placeholder='Add Tag'
                        />
                        {
                            existingTags && tags && inactiveTags(existingTags, tags)
                                .filter(tag => tag.title.includes(input))
                                .map(tag => <Tags onSelect={() => onSelect(tag, editing)}
                                    assignMode={editing} 
                                    active={false} 
                                    key={tag.id} 
                                    tag={tag}/>)
                        }
                    </div>}
            </>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.tags}>
                {
                    tags && tags.length > 0 
                        ? tags.map(tag => <Tags 
                                assignMode={editing} 
                                active={true} 
                                key={tag.id} 
                                onSelect={() => onSelect(tag, editing)} 
                                tag={tag}
                            />)
                        : 'It is Empty Here :('
                }
            </div>
            { editing && editMode() }
        </div>
    )
}
 
export default TagSection;