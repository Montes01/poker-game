import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../store/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch()

