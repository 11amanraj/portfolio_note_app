import Notes from './components/Sections/Notes';
import NoteContextProvider from './store/NoteContextProvider';
import SelectionContextProvider from './store/SelectionContextProvider';
import CreateNote from './components/CreateNote/CreateNote';
import NewNotes from './components/NewNotes';

function App() {
  // axios.get('http://localhost:8000/api/notebooks').then(response => console.log(response.data))
  // axios.get('http://localhost:8000/api/notes').then(response => console.log(response.data))

  return (
      <NoteContextProvider>
        <SelectionContextProvider>
          <NewNotes />
          {/* <CreateNote />
          <Notes /> */}
        </SelectionContextProvider>
      </NoteContextProvider>
  )
}

export default App;
