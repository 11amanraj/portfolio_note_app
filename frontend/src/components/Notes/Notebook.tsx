import EachNote from "./EachNote";

interface note {
    id: number,
    tags: string[],
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