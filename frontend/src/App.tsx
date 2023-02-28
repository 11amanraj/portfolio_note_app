import SideBar from './components/Navigation/Sidebar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Notebook from './pages/Notebook';
import NoteDetail from './pages/Note';
import CreateNote from './components/CreateNote/CreateNote';
import NotebooksContextProvider from './store/NotebooksContextProvider';

function App() {
  return (
    <NotebooksContextProvider>
      {/* <EditNote id='63fcd94ef0f9621416b102c2'/> */}
      <div style={{display: "flex"}}>
        <SideBar />
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/newnote' element={<CreateNote />}/>
          <Route path='/notebook/:id' element={<Notebook />}/>
          <Route path='/notebook/:id/note/:noteid' element={<NoteDetail />}/>
        </Routes>
      </div>
    </NotebooksContextProvider>
  )
}

export default App;
