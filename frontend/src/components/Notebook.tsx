import EachNote from "./EachNote";

interface note {
    id: number,
    title: string,
    body: string
}

const Notebook: React.FC<{notebook: note[]}> = ({notebook}) => {
    return ( 
        <div>
            {notebook.map(note => (
                <EachNote key={note.id} note={note}/>
            ))}
        </div>
     );
}
 
export default Notebook;