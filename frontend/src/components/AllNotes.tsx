import Notebook from "./Notebook"

interface note {
    id: number,
    title: string,
    body: string
}

interface notebook {
    [key: string]: note[]
}

// const notes: note[] = [
//     {
//         id: 1,
//         title: 'Note No. 1',
//         body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
//     },
//     {
//         id: 2,
//         title: 'Note No. 2',
//         body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium'
//     }
// ]

const notebooks: notebook = {
    Empty: [
        {
            id: 1,
            title: 'Note No. 1',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
    ],
    History: [
        {
            id: 2,
            title: 'World War 1',
            body: 'World War I or the First World War, often abbreviated as WWI or WW1, and referred to by some Anglophone authors as the "Great War" or the "War to End All Wars", was a global conflict which lasted from 1914 to 1918, and is considered one of the deadliest conflicts in history.'
        },
        {
            id: 3,
            title: 'World War 2',
            body: 'World War II or the Second World War, often abbreviated as WWII or WW2, was a world war that lasted from 1939 to 1945. It involved the vast majority of the world\'s countries—including all of the great powers—forming two opposing military alliances: the Allies and the Axis powers. World War II was a total war that directly involved more than 100 million personnel from more than 30 countries.'
        }
    ],
    Geography: [
        {
            id: 4,
            title: 'Deltas',
            body: 'Deltas form as rivers empty their water and sediment into another body of water, such as an ocean, lake, or another river.'
        }
    ]

}

const AllNotes = () => {
    return (
        <>
            {Object.keys(notebooks).map(key => (
                <div key={key}>
                    <h2>{key}</h2>
                    <Notebook notebook={notebooks[key]}/>
                </div>
            ))}
        </>
    );
}

export default AllNotes;