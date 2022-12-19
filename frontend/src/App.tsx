import Notes from './components/Sections/Notes';
import NoteContextProvider from './store/NoteContextProvider';

function App() {
  return (
      <NoteContextProvider>
          <Notes />
      </NoteContextProvider>
  )
}

export default App;
