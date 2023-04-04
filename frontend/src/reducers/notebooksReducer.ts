import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../store/store'
import { notebook } from '../shared/interfaces/notes'
import notebookService from '../services/notebookService'

const initialState: notebook[] = []

// add loading and error fields later

const notebooksReducer = createSlice({
    name: 'notebooks',
    initialState,
    reducers: {
        addNotebook: (state, action: PayloadAction<notebook>) => {
            return [...state, action.payload]
        },
        removeNotebook: (state, action: PayloadAction<string>) => {
            return state.filter(notebook => notebook.id !== action.payload)
        },
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

export const deleteOneNotebook = (id: string, token: string): AppThunk => {
    return async dispatch => {
        try {
            await notebookService.deleteOne(id, token) 
            dispatch(removeNotebook(id))  
            return {
                status: 200,
            }
        } catch (error: any) {
            return error
        }
    }
}

export const addNewNotebook = (title: string, token: string): AppThunk => {
    return async dispatch => {
        try {
            const savedNotebook = await notebookService.createNew(title, token)
            dispatch(addNotebook(savedNotebook))
            return {
                status: 200,
            }
        } catch(error: any) {
            return error
        }
    }
}

export const { setNotebooks, addNotebook, removeNotebook } = notebooksReducer.actions
export default notebooksReducer.reducer