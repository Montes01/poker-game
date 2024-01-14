import { createSlice } from "@reduxjs/toolkit"
import { type room, type player } from "../../../constants/declarations"
import { type PayloadAction } from "@reduxjs/toolkit"
import { ioEvents } from "../../../constants/declarations"
import { connection } from "../../../../App"
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
      const room = { ...state, id: crypto.randomUUID(), name: action.payload }
      connection.emit(ioEvents.createRoom, room)
      return room
    },
    addPlayer: (state, action: PayloadAction<player>) => {
      connection.emit(ioEvents.addPlayer, {
        roomId: state.id,
        player: action.payload,
      })
      return {
        ...state,
        players: [...state.players, action.payload],
        admin: state.players.length < 1 ? action.payload.id : state.admin,
      }
    },
    vote: (state, action: PayloadAction<{ card: string; id: string }>) => {
      connection.emit(ioEvents.vote, {
        roomId: state.id,
        vote: action.payload,
      })
      return {
        ...state,
        players: state.players.map((player) => {
          if (player.id === action.payload.id) {
            return { ...player, vote: action.payload.card }
          } else return player
        }),
      }
    },
    reset: (state) => {
      return {
        ...state,
        players: state.players.map((player) => ({ ...player, vote: "none" })),
      }
    },
    updateRoom: (_, { payload }: PayloadAction<room>) => {
      return payload
    },
  },
  initialState,
})

export const slice = roomSlice.reducer

export const createRoom = roomSlice.actions.createRoom
export const addPlayer = roomSlice.actions.addPlayer
export const vote = roomSlice.actions.vote
export const reset = roomSlice.actions.reset
export const updateRoom = roomSlice.actions.updateRoom
