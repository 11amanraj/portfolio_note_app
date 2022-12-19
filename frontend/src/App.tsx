import Notes from './components/Sections/Notes';
import NoteContextProvider from './store/NoteContextProvider';
import SelectionContextProvider from './store/SelectionContextProvider';

function App() {
  return (
      <NoteContextProvider>
        <SelectionContextProvider>
          <Notes />
        </SelectionContextProvider>
      </NoteContextProvider>
  )
}

export default App;
