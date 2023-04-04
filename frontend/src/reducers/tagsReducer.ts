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
        }
    }
})

export const fetchAllTags = (token: string): AppThunk => {
    return async dispatch => {
        const tags = await tagService.getAll(token) 
        console.log(tags)
        dispatch(setTags(tags))  
    }
}

export const { setTags } = tagsReducer.actions
export default tagsReducer.reducer