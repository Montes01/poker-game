import { createSlice } from "@reduxjs/toolkit"
import { type room, type player } from "../../../constants/declarations"
import { type PayloadAction } from "@reduxjs/toolkit"
import { ioEvents } from "../../../constants/declarations"
import { connection } from "../../../../App"
import { cards } from "../../../constants/constants"
const initialState: room = {
  id: "",
  name: "",
  admin: "",
  players: [],
  isRevealed: false,
  cards: cards,
}

const roomSlice = createSlice({
  name: "room",
  reducers: {
    createRoom: (state, action: PayloadAction<string>) => {
      const room = { ...state, id: crypto.randomUUID(), name: action.payload }
      connection.emit(ioEvents.createRoom, room)
      return room
    },
    updateRoom: (_, { payload }: PayloadAction<room>) => {
      return payload
    },
    changeLocalVote: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        cards: state.cards.map((card) => {
          return { ...card, voted: card.content === payload ? true : false }
        }),
      }
    },
  },
  initialState,
})

export const slice = roomSlice.reducer
export const createRoom = roomSlice.actions.createRoom
export const updateRoom = roomSlice.actions.updateRoom
export const changeLocalVote = roomSlice.actions.changeLocalVote