export enum playerType {
  player = "player",
  spectator = "spectator",
}
export interface player {
  name: string
  id: string
  type: keyof typeof playerType
  vote: string
}

export interface room {
  id: string
  name: string
  admin: string
  players: player[]
}

export interface Card {
  content: string
  voted: boolean
  count?: number
}
export enum ioEvents {
  createRoom = "createRoom",
  addPlayer = "addPlayer",
  vote = "vote",
  reset = "reset",
  reveal = "reveal",
  disconnect = "disconnect",
  connect = "connect",
  joinRoom = "joinRoom",
}