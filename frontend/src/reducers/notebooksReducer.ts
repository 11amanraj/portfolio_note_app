import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../store/store'
import { notebook, note } from '../shared/interfaces/notes'
import notebookService from '../services/notebookService'

const initialState: notebook[] = []

// add loading and error fields later

const notebooksReducer = createSlice({
    name: 'notebooks',
    initialState,
    reducers: {
        addNotebook: (state, action: PayloadAction<notebook>) => {
            return state.concat(action.payload)
        },
        removeNotebook: (state, action: PayloadAction<string>) => {
            return state.filter(notebook => notebook.id !== action.payload)
        },
        addOneNote: (state, action: PayloadAction<{notebookID: string, note: note}>) => {
            const selectedNotebook = state.find(notebook => notebook.id === action.payload.notebookID)
            if(selectedNotebook) {
                const notes = selectedNotebook.notes.concat(action.payload.note)
                return state.map(notebook => notebook.id === action.payload.notebookID 
                    ? {...selectedNotebook, notes: notes}
                    : notebook 
                )
            } else return state
        },
        updateOneNote: (state, action: PayloadAction<note>) => {
            const selectedNotebook = state.find(notebook => notebook.id === action.payload.notebook)
            if(selectedNotebook) {
                const notes = selectedNotebook.notes.map(note => 
                    note.id === action.payload.id 
                        ? action.payload 
                        : note
                )
                return state.map(notebook => notebook.id === action.payload.notebook
                    ? {...selectedNotebook, notes: notes}
                    : notebook 
                )
            } else return state
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

export const { setNotebooks, addNotebook, removeNotebook, addOneNote, updateOneNote } = notebooksReducer.actions
export default notebooksReducer.reducer