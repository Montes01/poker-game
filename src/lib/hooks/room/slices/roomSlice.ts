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
    vote: (state, action: PayloadAction<{ card: string; id: string }>) => {
      return {
        ...state,
        players: state.players.map((player) => {
          if (player.id === action.payload.id) {
            return { ...player, vote: action.payload.card }
          } else return player
        }),
      }
    },

  },
  initialState,
})

export const slice = roomSlice.reducer

export const createRoom = roomSlice.actions.createRoom
export const addPlayer = roomSlice.actions.addPlayer
export const vote = roomSlice.actions.vote
