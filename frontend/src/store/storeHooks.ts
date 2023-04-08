import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

type DisptachFunc = () => AppDispatch
export const useAppDispatch: DisptachFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector