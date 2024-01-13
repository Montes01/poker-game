import { createSlice } from "@reduxjs/toolkit"
import { type PayloadAction } from "@reduxjs/toolkit"
import { player } from "../../../constants/declarations"

const initialState: player = {
  id: "NA",
  name: "",
  type: "player",
  vote: "none",
}

const playerSlice = createSlice({
  reducers: {
    setPlayer: (_, action: PayloadAction<player>) => {
      return action.payload
    },
    setIsSpectator: (state, action: PayloadAction<boolean>) => {
      return { ...state, type: action.payload ? "spectator" : "player" }
    },
    setVote: (state, action: PayloadAction<string>) => {
      return { ...state, vote: action.payload }
    },
  },
  initialState,
  name: "player",
})

export const slice = playerSlice.reducer

export const setPlayer = playerSlice.actions.setPlayer
export const setIsSpectator = playerSlice.actions.setIsSpectator
export const setVote = playerSlice.actions.setVote
