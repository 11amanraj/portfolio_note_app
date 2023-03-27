import { useContext, useState } from 'react';
import { TagContext } from '../../store/TagsContextProvider';
import Loading from '../UI/Loading';
import Tags from '../UI/Tags';
import styles from './EveryTag.module.css'

const EveryTag = () => {
    const [showModal, setShowModal] = useState(false)
    const [modalID, setModalID] = useState('')
    const { allTags, loading } = useContext(TagContext)

    const selectionHandler = (id: string) => {
        if(modalID === id) {
            setShowModal(prev => !prev)
        } else {
            setShowModal(true)
            setModalID(id)
        }
    }

    if(loading) {
        return (
            <section className={`${styles.container} ${styles.loading}`}>
                <Loading />
            </section>
        )
    } else {
        return ( 
            <section className={styles.container}>
                <div className={styles.tags}>
                    {allTags && allTags.map(tag => (
                        <Tags key={tag.id} 
                            active={true} 
                            tag={tag} 
                            onSelect={() => selectionHandler(tag.id)}
                            showModal={showModal && (modalID === tag.id)}
                        />
                        )
                    )}
                </div>
                {/* <div id='tag-section-modal' className={styles.working}>Lorem Ipsum</div> */}
                {showModal && <div id='tag-section-modal' className={styles.working}></div> }
            </section>
         );
    }

}
 
export default EveryTag;