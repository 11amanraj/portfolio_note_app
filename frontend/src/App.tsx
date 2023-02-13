import { useState } from 'react';
import DetailedSection from './components/DetailedSection';
import SideBar from './components/Sidebar';
import { notebook } from './shared/interfaces/notes';
import SelectionContextProvider from './store/SelectionContextProvider';

import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Notes from './pages/Notes';
import NoteDetail from './pages/NoteDetail';

function App() {
  const [notebook, setNotebook] = useState<notebook | null>(null)

  const notebookSelectionHandler = (selectedNotebook: notebook) => {
    setNotebook(selectedNotebook)
  }

  return (
    <SelectionContextProvider>
      <div style={{display: "flex"}}>
        <SideBar onSelect={notebookSelectionHandler}/>
        
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/notes' element={<Notes />}/>
          <Route path='/detail' element={<NoteDetail />}/>
        </Routes>
        
        {/* <DetailedSection notebook={notebook}/> */}
      </div>
    </SelectionContextProvider>
  )
}

export default App;
