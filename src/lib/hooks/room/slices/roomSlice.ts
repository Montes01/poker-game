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
    updateRoom: (_, { payload }: PayloadAction<room>) => {
      return payload
    },
    changeLocalVote: (state, { payload }: PayloadAction<string>) => {
      console.log(payload)
      return {
        ...state,
        cards: state.cards.map((card) => {
          return { ...card, voted: card.content === payload }
        }),
      }
    },
  },
  initialState,
})

export const slice = roomSlice.reducer
export const updateRoom = roomSlice.actions.updateRoom
export const changeLocalVote = roomSlice.actions.changeLocalVote