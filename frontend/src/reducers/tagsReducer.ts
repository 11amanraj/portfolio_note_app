import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { tag } from '../shared/interfaces/notes'
import tagService from '../services/tagService'
import { AppThunk } from '../store/store'
import { addOneNotification } from './notificationReducer'

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
        },
        updateTag: (state, action: PayloadAction<tag>) => {
            return state
        },
        deleteTag: (state, action: PayloadAction<string>) => {
            return state.filter(tag => tag.id !== action.payload)
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
            dispatch(addOneNotification({
                error: false,
                message: `${title} added`
            }))
            // return status code if promise successful
        } catch(error: any) {
            dispatch(addOneNotification({
                error: true,
                message: `${error.data}`
            }))
        }
    }
}

export const updateOneTag = (tag: tag, title: string, token: string): AppThunk => {
    return async dispatch => {
        try {
            const updatedTag = await tagService.updateOne(tag.id, title, token)
            
            // dispatch(updateTag(updatedTag))

            dispatch(addOneNotification({
                error: false,
                message: `${tag.title} deleted`
            }))
        } catch(error: any) {
            dispatch(addOneNotification({
                error: true,
                message: `${error.data}`
            }))

        }
    } 
}

export const deleteOneTag = (tag: tag, token: string): AppThunk => {
    return async dispatch => {
        try {
            await tagService.deleteOne(tag.id, token)
            dispatch(deleteTag(tag.id))

            dispatch(addOneNotification({
                error: false,
                message: `${tag.title} deleted`
            }))
        } catch(error: any) {
            dispatch(addOneNotification({
                error: true,
                message: `${error.data}`
            }))
        }
    } 
}

export const { setTags, addTag, updateTag, deleteTag } = tagsReducer.actions
export default tagsReducer.reducer