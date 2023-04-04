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
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { addNewNotebook } from '../../reducers/notebooksReducer';

const SideBar = () => {
    const { loading, addNotebook } = useContext(NotebooksContext)
    const {error, title, messageHandler, showMessage} = useContext(MessageContext)

    const notebooks = useAppSelector(state => state.notebooks)
    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const saveNotebook = async (title: string) => {
        const result = await dispatch(addNewNotebook(title, user.token))
        return result
    }


    // Add loading component here

    return ( 
        <nav className={styles.container}>
            {showMessage && <Message error={error} message={title}/>}
            <Link to={'/'}><h2>TheNotesApp</h2></Link>
            <AddEntry addEntry={saveNotebook}/>
            <Filter />
            {notebooks.map(notebook => (
                <NotebookTitles key={notebook.id} notebook={notebook}/>
            ))}
            <EveryTag />
        </nav>
     );
}
 
export default SideBar;
