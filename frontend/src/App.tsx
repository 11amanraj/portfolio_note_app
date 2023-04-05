import SideBar from './components/Navigation/Sidebar';
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
  console.log(notification)
  
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
      {notification.length > 0 && <Message notification={notification} error={notification[0].error} message={notification[0].message} />}
      {/* <Message error={false} message='agsh hfajs' />
      <Message error={false} message='agsh hfajs' /> */}
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
    </>
  )
}

export default App;
