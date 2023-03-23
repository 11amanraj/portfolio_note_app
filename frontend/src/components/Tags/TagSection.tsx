import styles from './TagSection.module.css'
import Tags from '../UI/Tags';
import { tag } from '../../shared/interfaces/notes';
import axios, { all } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { TagContext } from '../../store/TagsContextProvider';

const TagSection: React.FC<{
        onSelect: (tag: tag, editing: boolean) => void , 
        onRemove: (tag: tag) => void, 
        editing: boolean , 
        tags: tag[] | undefined
    }> = ({onSelect, onRemove, editing, tags}) => {
    const [input, setInput] = useState('')
    // const [allTags, setAllTags] = useState<tag[] | null>(null)
    const [showAllTags, setShowAllTags] = useState(false)

    const { allTags } = useContext(TagContext)

    // useEffect(() => {
    //     axios
    //         .get('http://localhost:8000/api/tags')
    //         .then(response => {
    //             setAllTags(response.data)
    //         }).catch(error => console.log(error))
    // }, [])

    const inactiveTags = (biggerArray: tag[], smallerArray: tag[]) => {
        const smallerArrayIDs = smallerArray.map(tag => tag.id)
        return biggerArray
            .filter(tag => !smallerArrayIDs.includes(tag.id))
    }

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
            <div className={styles.editing}>
                {
                    allTags && tags && inactiveTags(allTags, tags)
                        .map(tag => <Tags onSelect={() => onSelect(tag, editing)} 
                            active={false} 
                            key={tag.id} 
                            onDelete={() => onRemove(tag)} 
                            tag={tag.name}/>)
                }
            </div>
        )
    }

    // const viewMode = () => {
    //     return ( 
    //         <>
    //             {tags && tags.length > 0 
    //                 ? tags.map(tag => <Tags key={tag.id} tag={tag.name}/>)
    //                 : 'It is Empty Here :('
    //             }
    //         </>
    //      );
    // }

    return (
        <div className={styles.container}>
            <div className={styles.tags}>
                {
                    tags && tags.length > 0 
                        ? tags.map(tag => <Tags active={true} key={tag.id} onSelect={() => onSelect(tag, editing)} onDelete={() => onRemove(tag)} tag={tag.name}/>)
                        : 'It is Empty Here :('
                }
            </div>
            { editing && editMode() }
        </div>
    )
}
 
export default TagSection;