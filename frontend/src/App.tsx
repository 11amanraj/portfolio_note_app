// import CreateNote from './components/CreateNote/CreateNote';
import AllNotes from './components/Notes/AllNotes';
import NoteContextProvider from './store/NoteContextProvider';

function App() {
  return (
      <NoteContextProvider>
          {/* <CreateNote /> */}
          <AllNotes />
      </NoteContextProvider>
  )
}

export default App;
