import { configureStore } from "@reduxjs/toolkit"
import { slice as roomSlice } from "../hooks/room/slices/roomSlice"
import { slice as playerSlice } from "../hooks/player/slices/playerSlice"
export const store = configureStore({
  reducer: {
    room: roomSlice,
    player: playerSlice,
  },
})

export default store.dispatch
export type RootState = ReturnType<typeof store.getState>

store.subscribe(() => {
  console.log(store.getState())
})
