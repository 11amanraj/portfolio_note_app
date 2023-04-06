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
            return {
                status: 200,
            }
        } catch(error: any) {
            return error
        }
    }
}

export const deleteOneTag = (tag: tag, token: string): AppThunk => {
    return async dispatch => {
        try {
            await tagService.deleteOne(tag.id, token)
            dispatch(deleteTag(tag.id))

            const notificationID = Math.random().toString()
            dispatch(addOneNotification({
                error: false,
                message: `${tag.title} deleted`,
                id: notificationID
            }))
        } catch(error: any) {
            const notificationID = Math.random().toString()
            dispatch(addOneNotification({
                error: true,
                message: `${error.data}`,
                id: notificationID
            }))

        }
    } 
}

export const { setTags, addTag, deleteTag } = tagsReducer.actions
export default tagsReducer.reducer