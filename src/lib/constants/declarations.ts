export interface player {
  name: string
  id: string
  vote: number
}

export interface room {
  id: string
  name: string
  admin: string
  players: player[]
}
