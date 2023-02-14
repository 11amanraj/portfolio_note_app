import { useContext } from "react";
import { NotebooksContext } from "../../store/NotebooksContextProvider";
import styles from './AddNotebook.module.css'

const AddNotebook: React.FC<{title: string}> = ({title}) => {
    // const title = 'Very New Test Notebook'
    const { addNotebook } = useContext(NotebooksContext)

    return ( 
        <div onClick={() => addNotebook(title)} className={styles.container}>
            +
        </div>
     );
}
 
export default AddNotebook;