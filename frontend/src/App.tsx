import SideBar from './components/Navigation/Sidebar';
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Notebook from './pages/Notebook';
import Note from './pages/Note';
import NotebooksContextProvider from './store/NotebooksContextProvider';
import MessageContextProvider from './store/MessageContextProvider';
import TagContextProvider from './store/TagsContextProvider';
import { useAppDispatch } from './store/storeHooks';
import { fetchAllTags } from './reducers/tagsReducer';
import { setUser } from './reducers/userReducer'
import { fetchAllNotebooks } from './reducers/notebooksReducer';

function App() {
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')    
    if (loggedUserJSON) {
        const loggedUser = JSON.parse(loggedUserJSON)
        dispatch(setUser(loggedUser))
        dispatch(fetchAllTags(loggedUser.token))
        dispatch(fetchAllNotebooks(loggedUser.token)) 
    }
  }, [dispatch])

  return (
    <MessageContextProvider>
      <NotebooksContextProvider>
        <TagContextProvider>
          <div style={{display: "flex"}}>
                {/* <SideBar /> */}
            <Routes>
              {/* <Route path='/login' element={<Login />} />
              <Route path='/home' element={<HomePage />}/> */}
              <Route path='/' element={<Home/>}/>
              <Route path='/notebook/:id' element={<Notebook />}/>
              <Route path='/notebook/:id/note/:noteid' element={<Note />}/>
            </Routes>
          </div>
        </TagContextProvider>
      </NotebooksContextProvider>
    </MessageContextProvider>
  )
}

export default App;
