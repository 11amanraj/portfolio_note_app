import Search from '../Operations/Search';
import styles from './SearchBar.module.css'

const SearchBar: React.FC<{fullsize: boolean}> = ({fullsize}) => {
    if(!fullsize) {
        return (
            <Search />
        )
    } else {
        return ( 
            <section className={styles.container}>
                <h1>S</h1>
                <Search />
                <div className={styles['profile-picture']}>JD</div>
                <div className={styles.text}>Welcome, John Doe</div>
            </section>
         );
    }
}
 
export default SearchBar;