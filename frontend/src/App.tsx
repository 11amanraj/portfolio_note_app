import { useState } from 'react';
import DetailedSection from './components/DetailedSection';
import SideBar from './components/Sidebar';
import { notebook } from './shared/interfaces/notes';

function App() {
  const [notebook, setNotebook] = useState<notebook | null>(null)

  return (
      <div style={{display: "flex"}}>
        <SideBar />
        <DetailedSection notebook={notebook}/>
      </div>
  )
}

export default App;
