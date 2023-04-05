import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../store/store'

interface notification {
    message: string,
    error: boolean,
    id: string
}

const initialState: notification[] = []

const notificationReducer = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<notification>) => {
            return state.concat(action.payload)
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            return state.filter(notification => notification.id !== action.payload)
        }
    }
})

export const addOneNotification = (notification: notification): AppThunk => {
    return async dispatch => {
        dispatch(addNotification(notification))
        setTimeout(() => {
            dispatch(removeNotification(notification.id))
        }, 5000)
    }
}

export const { addNotification, removeNotification } = notificationReducer.actions 
export default notificationReducer.reducer