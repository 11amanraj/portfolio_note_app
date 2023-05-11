import Search from '../Operations/Search';
import styles from './SearchBar.module.css'
import { ReactComponent as SearchIcon } from '@material-symbols/svg-400/outlined/search.svg';

const SearchBar: React.FC<{fullsize: boolean, sidebarHandler?: () => void}> = ({fullsize, sidebarHandler}) => {
    if(!fullsize) {
        return (
            <Search />
        )
    } else {
        return ( 
            <section className={styles.container}>
                <SearchIcon />
                <Search />
                <div className={styles['profile-picture']}>JD</div>
                <div className={styles.text}>Welcome, John Doe</div>
            </section>
         );
    }
}
 
export default SearchBar;