import styles from './TagSection.module.css'
import Tags from '../UI/Tags';
import { tag } from '../../shared/interfaces/notes';
import axios from 'axios';
import { useEffect, useState } from 'react';

const TagSection: React.FC<{onSelect: (tag: tag) => void , 
        onRemove: (tag: tag) => void, 
        editing: boolean , 
        tags: tag[] | undefined
    }> = ({onSelect, onRemove, editing, tags}) => {
    const [input, setInput] = useState('')
    const [allTags, setAllTags] = useState<tag[] | null>(null)
    const [showAllTags, setShowAllTags] = useState(false)

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/tags')
            .then(response => {
                setAllTags(response.data)
            }).catch(error => console.log(error))
    }, [])

    const editMode = () => {
        const saveHandler = () => {
            axios
                .post('http://localhost:8000/api/tags', {
                    name: input
                })
                .then(response => {
                    console.log(response)
                }).catch(error => console.log(error))
        }

        const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value)
        }

        return (
            <div className={styles['input-field']}>
                <input onChange={changeHandler}  
                    onFocus={() => setShowAllTags(true)} 
                     />
                <button onClick={saveHandler}>Save</button>
                {
                    showAllTags && allTags && 
                    <ul className={styles.dropdown}>
                        {
                            input.length > 0 && 
                            <li onClick={saveHandler}>
                                {input}
                                <button onClick={saveHandler}>Save</button>
                            </li>
                        }
                        {
                            allTags
                                .filter(tag => tag.name.toLowerCase().includes(input.toLowerCase()))
                                .map(tag => <li onClick={() => onSelect(tag)} key={tag.id}>{tag.name}</li>)
                        }
                    </ul>
                }
            </div>
        )
    }

    const viewMode = () => {
        return ( 
            <>
                {tags && tags.length > 0 
                    ? tags.map(tag => <Tags key={tag.id} tag={tag.name}/>)
                    : 'It is Empty Here :('
                }
            </>
         );
    }

    return (
        <div className={styles.container}>
            <div className={styles.tags}>
                {
                    tags && tags.length > 0 
                        ? tags.map(tag => <Tags key={tag.id} onDelete={() => onRemove(tag)} tag={tag.name}/>)
                        : 'It is Empty Here :('
                }
            </div>
            { editing && editMode() }
        </div>
    )
}
 
export default TagSection;