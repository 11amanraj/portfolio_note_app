import { createSlice } from '@reduxjs/toolkit'
import { user } from '../shared/interfaces/notes'

const initialState: user | null = null

const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            return action.payload
        }
    }
})

export const { setUser } = userReducer.actions
export default userReducer.reducer