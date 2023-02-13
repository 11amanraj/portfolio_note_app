import { useState } from 'react';
import DetailedSection from './components/DetailedSection';
import SideBar from './components/Sidebar';
import { notebook } from './shared/interfaces/notes';
import SelectionContextProvider from './store/SelectionContextProvider';

import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Notebook from './pages/Notebook';
import NoteDetail from './pages/Note';

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
          <Route path='/notebook/:id' element={<Notebook />}/>
          <Route path='/note/:id' element={<NoteDetail />}/>
        </Routes>
        
        {/* <DetailedSection notebook={notebook}/> */}
      </div>
    </SelectionContextProvider>
  )
}

export default App;
