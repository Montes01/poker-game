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
      io.to(roomId).emit(
        "updateRoom",
        rooms.find((r) => r.id === roomId)
      )
    }
  })

  socket.on("addPlayer", (info) => {
    const id = info.roomId
    const player = info.player
    console.log({ id, player })
    rooms.find((room) => room.id === id).players.push(player)
    io.to(id).emit(
      "updateRoom",
      rooms.find((r) => r.id === id)
    )
  })

  socket.on("vote", (info) => {
    const id = info.roomId
    const vote = info.vote
    rooms
      .find((room) => room.id === id)
      .players.find((player) => player.id === vote.id).vote = vote.vote
  })
  //add disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected")
  })
})
