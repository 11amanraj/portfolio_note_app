import styles from './Sidebar.module.css'
import NotebookTitles from './NotebookTitles';
import { Link } from 'react-router-dom';
import AddEntry from '../Operations/AddEntry';
import Filter from '../Operations/Filter';
import EveryTag from './EveryTag';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { addNewNotebook } from '../../reducers/notebooksReducer';
import NotebookAccordion from './NotebookAccordion';

const SideBar: React.FC<{onClose?: () => void, breakpoint: string}> = ({onClose, breakpoint}) => {
    const notebooks = useAppSelector(state => state.notebooks)
    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const saveNotebook = async (title: string) => {
        const result = await dispatch(addNewNotebook(title, user.token))
        return result
    }

    const getCSSStyle = (breakpoint: string) => {
        if(breakpoint === 'desktop') {
            return styles.container
        } else if(breakpoint === 'mobile') {
            return `${styles.container} ${styles.mobile}`
        } else if(breakpoint === 'tablet') {
            return `${styles.container} ${styles.tablet}`
        }
    }

    // const cssStyle = breakpoint ?  
 
    return ( 
        // <nav className={styles.container}>
        <nav className={getCSSStyle(breakpoint)}>
            {onClose && <button onClick={onClose}>Close</button>}
            {/* {showMessage && <Message error={error} message={title}/>} */}
            <Link to={'/'}><h2>TheNotesApp</h2></Link>
            <AddEntry addEntry={saveNotebook}/>
            <Filter />
            <div id='notebookAccordion'>
                {notebooks.map(notebook => (
                    <NotebookTitles key={notebook.id} notebook={notebook}/>
                ))}
            </div>
            {/* <ul className={styles.accordion}>
                <NotebookAccordion />
                <NotebookAccordion />
            </ul> */}
            {/* <EveryTag /> */}
        </nav>
     );
}
 
export default SideBar;
