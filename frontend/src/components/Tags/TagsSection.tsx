import Tags from '../UI/Tags';
import styles from './TagsSection.module.css'

const TagsSection = () => {
    const tags = ['homework', 'important', 'space']
    return ( 
        <section className={styles.container}>
            {tags.map(tag => <Tags tag={tag}/>)}
        </section>
     );
}
 
export default TagsSection;