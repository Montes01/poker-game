import { configureStore } from "@reduxjs/toolkit"
import { slice } from "../hooks/room/slices/roomSlice"
export const store = configureStore({
  reducer: {
    room: slice,
  },
})

export default store.dispatch
export type RootState = ReturnType<typeof store.getState>

store.subscribe(() => {
  console.log(store.getState())
})
