import { AnyAction, ThunkAction, configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import tagsReducer from "../reducers/tagsReducer";
import notebooksReducer from "../reducers/notebooksReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        tags: tagsReducer,
        notebooks: notebooksReducer
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