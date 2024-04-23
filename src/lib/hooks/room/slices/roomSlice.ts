import { createSlice } from "@reduxjs/toolkit"
import { type room, type player, Card, playerType } from "../../../constants/declarations"
import { type PayloadAction } from "@reduxjs/toolkit"
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
    changeAdmin: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        admin: payload,
      }
    },
    changeCards: (state, { payload }: PayloadAction<Card[]>) => {
      return {
        ...state,
        cards: payload,
        players: state.players.map((player) => {
          return { ...player, vote: "none" }
        })
      }
    },
    reveal: (state) => {
      return {
        ...state,
        isRevealed: true,
      }
    },
    reset: (state) => {
      return {
        ...state,
        isRevealed: false,
        players: state.players.map((player) => {
          return { ...player, vote: "none" }
        }),
        cards: state.cards.map((card) => {
          return { ...card, count: 0 }
        }),
      }
    },
    changePlayerType: (state, { payload }: PayloadAction<{ playerId: string, type: keyof typeof playerType }>) => {
      const { playerId, type } = payload
      return {
        ...state,
        players: state.players.map((player) => {
          if (player.id === playerId) {
            return { ...player, type: type }
          }
          return player
        }),
      }
    }
  },
  initialState,
})

export const slice = roomSlice.reducer
export const updateRoom = roomSlice.actions.updateRoom
export const addPlayer = roomSlice.actions.addPlayer
export const vote = roomSlice.actions.vote
export const changeAdmin = roomSlice.actions.changeAdmin
export const changeCards = roomSlice.actions.changeCards
export const reveal = roomSlice.actions.reveal
export const reset = roomSlice.actions.reset
export const changePlayerType = roomSlice.actions.changePlayerType