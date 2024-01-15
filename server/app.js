import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
const app = express()
const server = createServer(app)
const PORT = 3000
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

server.listen(process.env.PORT ?? 3000, () => {
  console.log(` Server is running on port ${PORT}`)
})

const rooms = []
io.on("connection", (socket) => {
  console.log("New client connected")

  socket.on("createRoom", (room) => {
    socket.join(room.id)
    console.log("room created with id: ", room.id)
    rooms.push(room)
  })
  socket.on("joinRoom", (roomId, callback) => {
    if (!rooms.find((r) => r.id === roomId)) callback(false)
    else {
      callback(
        true,
        rooms.find((r) => r.id === roomId)
      )
      socket.join(roomId)
      emitRoomUpdate(roomId)
    }
  })

  socket.on("addPlayer", (data) => {
    const id = data.roomId
    const player = data.player
    console.log({ id, player })
    rooms.find((room) => room.id === id).players.push(player)
    if (rooms.find((room) => room.id === id).players.length === 1) {
      rooms.find((room) => room.id === id).admin = player.id
    }
    emitRoomUpdate(id)
  })

  socket.on("vote", (data) => {
    const id = data.roomId
    const vote = data.vote
    rooms
      .find((room) => room.id === id)
      .players.find((player) => player.id === vote.id).vote = vote.card
    emitRoomUpdate(id)
  })
  socket.on("reset", (roomId) => {
    const players = rooms.find((room) => room.id === roomId).players
    rooms.find((room) => room.id === roomId).players = players.map((player) => {
      player.vote = null
      return player
    })
    rooms.find((room) => room.id === roomId).isRevealed = false
    emitRoomUpdate(roomId)
  })
  socket.on("giveAdmin", (data) => {
    const id = data.roomId
    const admin = data.admin
    rooms.find((room) => room.id === id).admin = admin
    emitRoomUpdate(id)
  })
  socket.on("reveal", (roomId) => {
    rooms.find((room) => room.id === roomId).isRevealed = true
    emitRoomUpdate(roomId)
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected")
  })

  function emitRoomUpdate(roomId) {
    io.to(roomId).emit(
      "updateRoom",
      rooms.find((r) => r.id === roomId)
    )
  }
})
