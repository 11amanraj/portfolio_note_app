import { useState } from 'react'
import axios from 'axios'
import { user } from '../../shared/interfaces/notes'

const LogIn: React.FC<{onLogin: (user: user) => void}> = ({onLogin}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await axios
                .post('http://localhost:8000/api/login', {
                    username: username,
                    password: password
                })
            const user = {
                id: response.data.id,
                username: response.data.username,
                name: response.data.name,
                token: `Bearer ${response.data.token}`
            }
            onLogin(user)
            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user)) 
            setError('')
        } catch(error: any) {
            if(error.response.status === 401) {
                setError(error.response.data)
            }
        }
    }

    const userChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    return ( 
        <div>
            <h2>Login</h2>
            <form onSubmit={submitHandler}>
                <label htmlFor="username">Username</label>
                <input onChange={userChangeHandler} type="text" name="username"/>

                <label htmlFor="password">Password</label>
                <input onChange={passwordChangeHandler} type="password" name="password"/>

                <button type="submit">Login</button>
            </form>
            <h2>{error}</h2>
        </div>
     );
}
 
export default LogIn;