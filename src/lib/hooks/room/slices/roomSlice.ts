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
    addPlayer: (state, { payload }: PayloadAction<player>) => {
      return {
        ...state,
        players: [...state.players, payload],
      }
    },
    vote: (state, { payload }: PayloadAction<{ playerId: string, cardContent: string }>) => {
      console.log(payload.playerId)
      return {
        ...state,
        players: state.players.map((player) => {
          if (player.id === payload.playerId) {
            return { ...player, vote: payload.cardContent }
          }
          return player
        }),
      }
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
export const addPlayer = roomSlice.actions.addPlayer
export const vote = roomSlice.actions.vote