import { useEffect, useState } from 'react';
import CreateNote from './components/CreateNote/CreateNote';
import AllNotes from './components/Notes/AllNotes';
import NoteContext from './store/note-context';
import axios from 'axios';
import { note, notebook } from './shared/interfaces/notes'

function App() {
  const [notebooks, setNotebooks] = useState<notebook>({})
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    axios.get<notebook>('http://localhost:3001/notebooks')
        .then(response => {
          const arr = Object.keys(response.data).map(key => (
            response.data[key].map((item: note) => item.tags) 
              )).flat(2)
          const set = new Set<string>(arr)
          
          setTags(Array.from(set))
          setNotebooks(response.data)
        })
        .catch(error => console.log(error))
}, [])

  return (
    <div>
      <NoteContext.Provider value={{notebooks, tags}}>
        <CreateNote />
        <AllNotes />
      </NoteContext.Provider>
    </div> 
  );
}

export default App;
