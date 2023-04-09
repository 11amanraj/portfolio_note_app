import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Notebook from './pages/Notebook';
import Note from './pages/Note';
import { useAppDispatch, useAppSelector } from './store/storeHooks';
import { fetchAllTags } from './reducers/tagsReducer';
import { setUser } from './reducers/userReducer'
import { fetchAllNotebooks } from './reducers/notebooksReducer';
import Message from './components/UI/Message';

function App() {
  const dispatch = useAppDispatch()
  const notification = useAppSelector(state => state.notification)
  
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
    <>
      {notification.length > 0 && <Message notification={notification} />}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/notebook/:id' element={<Notebook />}/>
        <Route path='/notebook/:id/note/:noteid' element={<Note />}/>
      </Routes>
    </>
  )
}

export default App;
