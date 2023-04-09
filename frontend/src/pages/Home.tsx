import { useState } from 'react'
import { setUser } from '../reducers/userReducer'
import LogIn from "../components/Home/LogIn";
import HomePage from '../components/Home/HomePage';
import SideBar from '../components/Navigation/Sidebar';
import { user } from '../shared/interfaces/notes';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import EachPage from './EachPage';

const Home = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)

    const [loggedIn, setLoggedIn] = useState(false)

    const loginHandler = (user: user) => {
        dispatch(setUser(user))
        setLoggedIn(true)
    }

    if(loggedIn || user.username.length > 0) {
        return (
            <EachPage>
                <HomePage />
            </EachPage>
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