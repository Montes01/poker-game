import { createSlice } from "@reduxjs/toolkit"
import { type room, type player } from "../../../constants/declarations"
import { type PayloadAction } from "@reduxjs/toolkit"

const initialState: room = {
  id: "",
  name: "",
  admin: "",
  players: [],
}

const roomSlice = createSlice({
  name: "room",
  reducers: {
    createRoom: (state, action: PayloadAction<string>) => {
      return { ...state, id: crypto.randomUUID(), name: action.payload }
    },
    addPlayer: (state, action: PayloadAction<player>) => {
      return {
        ...state,
        players: [...state.players, action.payload],
        admin: state.players.length < 1 ? action.payload.id : state.admin,
      }
    },
  },
  initialState,
})

export const slice = roomSlice.reducer

export const createRoom = roomSlice.actions.createRoom
export const addPlayer = roomSlice.actions.addPlayer