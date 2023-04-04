import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import LogIn from "../components/Home/LogIn";
import HomePage from '../components/Home/HomePage';
import SideBar from '../components/Navigation/Sidebar';
import { user } from '../shared/interfaces/notes';

const Home = () => {
    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.user)

    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        if(user === null) {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')    
            if (loggedUserJSON) {
                const loggedUser = JSON.parse(loggedUserJSON)
                dispatch(setUser(loggedUser))
                setLoggedIn(true)         
            }
        }
    }, [user, dispatch])

    const loginHandler = (user: user) => {
        dispatch(setUser(user))
        setLoggedIn(true)
    }

    if(loggedIn) {
        return (
            <>
                <SideBar />
                <HomePage />
            </>
        )
    } else {
        return <LogIn onLogin={loginHandler} />
    }

    // if(user === null) {
    //     return <LogIn onLogin={loginHandler} />
    // } else {
    //     return (
    //         <>
    //             <SideBar />
    //             <HomePage />
    //         </>
    //     ) 
    // }
}
 
export default Home;