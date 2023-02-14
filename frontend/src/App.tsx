import SideBar from './components/Navigation/Sidebar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Notebook from './pages/Notebook';
import NoteDetail from './pages/Note';
import CreateNote from './components/CreateNote/CreateNote';
import DropDown from './components/UI/DropDown';

function App() {
  return (
      <div style={{display: "flex"}}>
        <DropDown />
        <SideBar />
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/newnote' element={<CreateNote />}/>
          <Route path='/notebook/:id' element={<Notebook />}/>
          <Route path='/notebook/:id/note/:noteid' element={<NoteDetail />}/>
        </Routes>
      </div>
  )
}

export default App;
