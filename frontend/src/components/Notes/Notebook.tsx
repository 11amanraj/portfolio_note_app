import EachNote from "./EachNote";
import { note } from "../../shared/interfaces/notes";

const Notebook: React.FC<{notebook: note[]}> = ({notebook}) => {
    
    if (notebook.length === 0) {
        return <div>Empty Notebook</div>
    }

    return ( 
        <div>
            {notebook && notebook.map(note => (
                <EachNote key={note.id} note={note}/>
            ))}
        </div>
     );
}
 
export default Notebook;