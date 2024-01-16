import { createReducer } from "@reduxjs/toolkit"
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
    socket.roomId = room.id
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

  socket.on("changeCards", (data) => {
    const id = data.roomId
    const cards = data.cards
    rooms.find((room) => room.id === id).cards = cards
    rooms.find((room) => room.id === id).players = rooms
      .find((room) => room.id === id)
      .players.map((player) => {
        return { ...player, vote: "none" }
      })
    emitRoomUpdate(id)
  })

  socket.on("addPlayer", (data) => {
    const id = data.roomId
    const player = data.player
    socket.roomId = id
    console.log({ id, player })
    rooms
      .find((room) => room.id === id)
      .players.push({ ...player, serverId: socket.id })
    if (rooms.find((room) => room.id === id).players.length === 1) {
      rooms.find((room) => room.id === id).admin = player.id
    }

    emitRoomUpdate(id)
    console.log(socket.id)
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
    
    rooms.find((room) => room.id === roomId).cards = rooms
      .find((room) => room.id === roomId)
      .cards.map((card) => {
        return { ...card, count: undefined }
      })

    rooms.find((room) => room.id === roomId).players = players.map((player) => {
      player.vote = null
      return player
    })
    rooms.find((room) => room.id === roomId).isRevealed = false
    emitRoomUpdate(roomId)
    socket.to(roomId).emit("reset")
  })
  socket.on("giveAdmin", (data) => {
    const id = data.roomId
    const admin = data.admin
    rooms.find((room) => room.id === id).admin = admin
    emitRoomUpdate(id)
  })
  socket.on("reveal", (roomId) => {
    rooms.find((room) => room.id === roomId).isRevealed = true
    rooms
      .find((room) => room.id === roomId)
      .players.forEach((player) => {
        const vote = player.vote
        if (
          rooms
            .find((room) => room.id === roomId)
            .cards.find((card) => card.content === vote).count
        ) {
          rooms
            .find((room) => room.id === roomId)
            .cards.find((card) => card.content === vote).count++
        } else {
          rooms
            .find((room) => room.id === roomId)
            .cards.find((card) => card.content === vote).count = 1
        }
      })
    console.log(rooms.find((room) => room.id === roomId).cards)
    emitRoomUpdate(roomId)
  })

  socket.on("disconnect", () => {
    const roomId = socket.roomId
    console.log("roomId", roomId)
    if (!roomId) return
    const player = rooms
      .find((room) => room.id === roomId)
      .players.find((player) => player.serverId === socket.id)

    if (player) {
      rooms.find((room) => room.id === roomId).players = rooms
        .find((room) => room.id === roomId)
        .players.filter((player) => player.serverId !== socket.id)
      if (player.id === rooms.find((room) => room.id === roomId).admin) {
        try {
          rooms.find((room) => room.id === roomId).admin = rooms.find(
            (room) => room.id === roomId
          ).players[0].id
        } catch {
          rooms.pop(rooms.find((room) => room.id === roomId))
        }
      }
      emitRoomUpdate(roomId)
    }
    console.log("Client disconnected")
  })

  function emitRoomUpdate(roomId) {
    io.to(roomId).emit(
      "updateRoom",
      rooms.find((r) => r.id === roomId)
    )
  }
})
//24688dc9-a4d1-49ce-8940-5bfe6822cb12
