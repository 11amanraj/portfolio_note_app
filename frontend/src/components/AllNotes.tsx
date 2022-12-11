import EachNote from "./EachNote"

interface note {
    id: number,
    title: string,
    body: string
}

const notes: note[] = [
    {
        id: 1,
        title: 'Note No. 1',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        id: 2,
        title: 'Note No. 2',
        body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium'
    }
]

const AllNotes = () => {
    return (
        <>
            {notes.map(note => (
                <EachNote key={note.id} note={note}/>
            ))}
        </>
    );
}

export default AllNotes;