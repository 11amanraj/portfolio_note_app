import { useContext } from 'react';
import styles from './Sidebar.module.css'
import NotebookTitles from './NotebookTitles';
import { Link } from 'react-router-dom';
import { NotebooksContext } from '../../store/NotebooksContextProvider';
import AddEntry from '../Operations/AddEntry';
import Filter from '../Operations/Filter';
import { MessageContext } from '../../store/MessageContextProvider';
import Message from '../UI/Message';
import EveryTag from './EveryTag';
import { useAppSelector } from '../../store/storeHooks';

const SideBar = () => {
    const { loading, addNotebook } = useContext(NotebooksContext)
    const {error, title, messageHandler, showMessage} = useContext(MessageContext)

    const notebooks = useAppSelector(state => state.notebooks)


    // Add loading component here

    return ( 
        <nav className={styles.container}>
            {showMessage && <Message error={error} message={title}/>}
            <Link to={'/'}><h2>TheNotesApp</h2></Link>
            <AddEntry addEntry={addNotebook}/>
            <Filter />
            {notebooks.map(notebook => (
                <NotebookTitles key={notebook.id} notebook={notebook}/>
            ))}
            <EveryTag />
        </nav>
     );
}
 
export default SideBar;
