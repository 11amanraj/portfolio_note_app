import SideBar from './components/Navigation/Sidebar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Notebook from './pages/Notebook';
import NoteDetail from './pages/Note';

function App() {
  return (
      <div style={{display: "flex"}}>
        <SideBar />
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/notebook/:id' element={<Notebook />}/>
          <Route path='/notebook/:id/note/:noteid' element={<NoteDetail />}/>
        </Routes>
      </div>
  )
}

export default App;
