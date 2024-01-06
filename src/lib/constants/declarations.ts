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
