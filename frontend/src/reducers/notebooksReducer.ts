import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../store/store'
import { notebook } from '../shared/interfaces/notes'
import notebookService from '../services/notebookService'

const initialState: notebook[] = []

const notebooksReducer = createSlice({
    name: 'notebooks',
    initialState,
    reducers: {
        setNotebooks: (state, action: PayloadAction<notebook[]>) => {
            return action.payload
        }
    }
})

export const fetchAllNotebooks = (token: string): AppThunk => {
    return async dispatch => {
        const notebooks = await notebookService.getAll(token) 
        dispatch(setNotebooks(notebooks))  
    }
}

export const { setNotebooks } = notebooksReducer.actions
export default notebooksReducer.reducer