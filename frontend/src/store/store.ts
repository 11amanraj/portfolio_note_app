import { AnyAction, ThunkAction, configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import tagsReducer from "../reducers/tagsReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        tags: tagsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType, 
    RootState, 
    unknown, 
    AnyAction
>

export default store