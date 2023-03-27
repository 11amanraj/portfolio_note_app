import { useContext } from 'react';
import { TagContext } from '../../store/TagsContextProvider';
import Loading from '../UI/Loading';
import Tags from '../UI/Tags';
import styles from './EveryTag.module.css'

const EveryTag = () => {
    const { allTags, loading } = useContext(TagContext)

    const selectionHandler = () => {}

    if(loading) {
        return (
            <section className={`${styles.container} ${styles.loading}`}>
                <Loading />
            </section>
        )
    } else {
        return ( 
            <section className={styles.container}>
                {allTags && allTags.map(tag => (
                    <Tags key={tag.id} 
                        active={true} 
                        tag={tag.name} 
                        onSelect={selectionHandler}
                    />
                    )
                )}
            </section>
         );
    }

}
 
export default EveryTag;