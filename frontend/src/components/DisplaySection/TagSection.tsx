import styles from './TagSection.module.css'
import Tags from '../UI/Tags';
import { tag } from '../../shared/interfaces/notes';
import axios from 'axios';
import { useState } from 'react';

const TagSection: React.FC<{editing: boolean, tags: tag[] | undefined}> = ({editing, tags}) => {
    const [input, setInput] = useState('')

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
            <>
                <div className={styles['input-field']}>
                    <input onChange={changeHandler} />
                    <button onClick={saveHandler}>Save</button>
                </div>
                <Tags tag='Editing' />
            </>
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
            {
                editing 
                    ? editMode() 
                    : viewMode()
            }
        </div>
    )
}
 
export default TagSection;