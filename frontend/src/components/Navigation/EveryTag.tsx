import { useContext } from 'react';
import { TagContext } from '../../store/TagsContextProvider';
import Loading from '../UI/Loading';
import Tags from '../UI/Tags';
import styles from './EveryTag.module.css'
import { useAppSelector } from '../../store/storeHooks';

const EveryTag = () => {
    const { allTags, loading } = useContext(TagContext)
    const tags = useAppSelector(state => state.tags)

    return ( 
        <section className={styles.container}>
            {tags.map(tag => (
                <Tags key={tag.id} 
                    active={true} 
                    tag={tag} 
                />
                )
            )}
        </section>
     );

    // if(loading) {
    //     return (
    //         <section className={`${styles.container} ${styles.loading}`}>
    //             <Loading />
    //         </section>
    //     )
    // } else {
    //     return ( 
    //         <section className={styles.container}>
    //             {tags.map(tag => (
    //                 <Tags key={tag.id} 
    //                     active={true} 
    //                     tag={tag} 
    //                 />
    //                 )
    //             )}
    //         </section>
    //      );
    // }
}
 
export default EveryTag;