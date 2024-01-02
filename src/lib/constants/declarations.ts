interface player {
  name: string
  vote: number
}

interface room {
  id: string
  name: string
  players: player[]
}
