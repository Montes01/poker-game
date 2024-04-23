export enum playerType {
  player = "player",
  spectator = "spectator",
}
export interface player {
  name: string
  id: string
  type: keyof typeof playerType
  vote: string
  serverId?: string
}

export interface room {
  id: string
  name: string
  admin: string
  players: player[]
  isRevealed: boolean
  cards: Card[]
}

export interface Card {
  content: string
  voted: boolean
  count?: number
}

export const cardTypes = {
  fibonacci: "fibonacci",
  normal: "normal",
  tenX: "tenX",
}

export enum ioEvents {
  changeType = "changeType",
  createRoom = "createRoom",
  addPlayer = "addPlayer",
  vote = "vote",
  reset = "reset",
  reveal = "reveal",
  connect = "connect",
  joinRoom = "joinRoom",
  updateRoom = "updateRoom",
  giveAdmin = "giveAdmin",
  changeCards = "changeCards",
}

export enum inputTypes {
  text = "text",
  password = "password",
  email = "email",
  number = "number",
  date = "date",
  time = "time",
  file = "file",
  checkbox = "checkbox",
  radio = "radio",
  color = "color",
  range = "range",
  search = "search",
  tel = "tel",
  url = "url",
  week = "week",
  month = "month",
}