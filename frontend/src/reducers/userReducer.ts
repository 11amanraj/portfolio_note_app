import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { user } from '../shared/interfaces/notes'

const initialState: user = {
    id: '',
    token: '',
    username: '',
    name: ''
}

const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<user>) => {
            return action.payload
        }
    }
})

export const { setUser } = userReducer.actions
export default userReducer.reducer