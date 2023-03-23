import SideBar from './components/Navigation/Sidebar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Notebook from './pages/Notebook';
import Note from './pages/Note';
import NotebooksContextProvider from './store/NotebooksContextProvider';
import MessageContextProvider from './store/MessageContextProvider';
import Tags from './pages/Tags';
import TagContextProvider from './store/TagsContextProvider';

function App() {
  return (
    <MessageContextProvider>
      <NotebooksContextProvider>
        <TagContextProvider>
          <div style={{display: "flex"}}>
            <SideBar />
            <Routes>
              <Route path='/' element={<HomePage />}/>
              <Route path='/notebook/:id' element={<Notebook />}/>
              <Route path='/notebook/:id/note/:noteid' element={<Note />}/>
              <Route path='/tags' element={<Tags />}/>
            </Routes>
          </div>
        </TagContextProvider>
      </NotebooksContextProvider>
    </MessageContextProvider>
  )
}

export default App;
