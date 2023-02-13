import { useState } from 'react';
import DetailedSection from './components/DetailedSection';
import SideBar from './components/Sidebar';
import { notebook } from './shared/interfaces/notes';
import SelectionContextProvider from './store/SelectionContextProvider';

function App() {
  const [notebook, setNotebook] = useState<notebook | null>(null)

  const notebookSelectionHandler = (selectedNotebook: notebook) => {
    setNotebook(selectedNotebook)
  }

  return (
    <SelectionContextProvider>
      <div style={{display: "flex"}}>
        <SideBar onSelect={notebookSelectionHandler}/>
        <DetailedSection notebook={notebook}/>
      </div>
    </SelectionContextProvider>
  )
}

export default App;
