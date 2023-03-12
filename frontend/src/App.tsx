import SideBar from './components/Navigation/Sidebar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Notebook from './pages/Notebook';
import Note from './pages/Note';
import CreateNote from './components/CreateNote/CreateNote';
import NotebooksContextProvider from './store/NotebooksContextProvider';
import Modal from './components/UI/Modal';

function App() {
  return (
    <NotebooksContextProvider>
      {/* <Modal /> */}
      <div style={{display: "flex"}}>
        <SideBar />
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/newnote' element={<CreateNote />}/>
          <Route path='/notebook/:id' element={<Notebook />}/>
          <Route path='/notebook/:id/note/:noteid' element={<Note />}/>
        </Routes>
      </div>
    </NotebooksContextProvider>
  )
}

export default App;
