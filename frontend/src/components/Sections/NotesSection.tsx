import { useContext } from "react"
import styles from './NotesSection.module.css'
// import { note } from '../../shared/interfaces/notes'
import EachNote from "../Notes/EachNote"
import SelectionContext from "../../store/selection-context"

const NotesSection = () => {
    const selectCtx = useContext(SelectionContext)

    return (
            <div className={styles.container}>
                <div className={styles.bgd}>
                    {selectCtx.selected ? selectCtx.selected.map(note => (
                            <EachNote key={Math.random()} note={note}/>
                    ))
                                    : 'No Notes Found'
                    }
                </div>
            </div>
        )
}
 
export default NotesSection;