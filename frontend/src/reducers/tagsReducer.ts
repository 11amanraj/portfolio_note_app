import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { tag } from '../shared/interfaces/notes'
import tagService from '../services/tagService'
import { AppThunk } from '../store/store'

const initialState: tag[] = []

const tagsReducer = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        setTags: (state, action: PayloadAction<tag[]>) => {
            return action.payload
        },
        addTag: (state, action: PayloadAction<tag[]>) => {
            return state.concat(action.payload)
        }
    }
})

export const fetchAllTags = (token: string): AppThunk => {
    return async dispatch => {
        const tags = await tagService.getAll(token) 
        dispatch(setTags(tags))  
    }
}

export const addNewTag = (title: string, token: string): AppThunk => {
    return async dispatch => {
        try {
            const savedTag = await tagService.createNew(title, token)
            dispatch(addTag(savedTag))
            return {
                status: 200,
            }
        } catch(error: any) {
            return error
        }
    }
}

export const { setTags, addTag } = tagsReducer.actions
export default tagsReducer.reducer