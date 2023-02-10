import Notes from './components/Sections/Notes';
import NoteContextProvider from './store/NoteContextProvider';
import SelectionContextProvider from './store/SelectionContextProvider';
import axios from 'axios';
import CreateNote from './components/CreateNote/CreateNote';

function App() {
  axios.get('http://localhost:8000/api/notebooks').then(response => console.log(response.data))
  axios.get('http://localhost:8000/api/notes').then(response => console.log(response.data))

  return (
      <NoteContextProvider>
        <SelectionContextProvider>
          <CreateNote />
          <Notes />
        </SelectionContextProvider>
      </NoteContextProvider>
  )
}

export default App;
