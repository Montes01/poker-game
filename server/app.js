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

const ioEvents = {
  CHANGE_TYPE: "changeType",
  CREATE_ROOM: "createRoom",
  ADD_PLAYER: "addPlayer",
  VOTE: "vote",
  RESET: "reset",
  REVEAL: "reveal",
  CONNECT: "connect",
  JOIN_ROOM: "joinRoom",
  UPDATE_ROOM: "updateRoom",
  GIVE_ADMIN: "giveAdmin",
  CHANGE_CARDS: "changeCards",
}

server.listen(process.env.PORT ?? 3000, () => {
  console.log(` Server is running on port ${PORT}`)
})

const rooms = []
io.on("connection", (socket) => {
  console.log("New client connected")

  socket.on(ioEvents.CREATE_ROOM, (room) => {
    socket.join(room.id)
    socket.roomId = room.id
    console.log("room created with id: ", room.id)
    rooms.push(room)
    emitToRoom(room.id, ioEvents.CREATE_ROOM, room)
  })



  socket.on(ioEvents.JOIN_ROOM, (roomId, callback) => {
    if (!rooms.find((r) => r.id === roomId)) callback(false)
    else {
      callback(true, rooms.find((r) => r.id === roomId))
      socket.join(roomId)
      socket.roomId = roomId
      emitToRoom(roomId, ioEvents.UPDATE_ROOM, rooms.find((r) => r.id === roomId))
    }
  })


  //ADD PLAYER TO ROOM
  socket.on(ioEvents.ADD_PLAYER, (data, callback) => {
    const id = data.roomId
    let name = data.name
    let type = data.type
    let vote = type === "spectator" ? "spectator" : "none"
    const player = { id: crypto.randomUUID(), name, type, vote }
    console.log(player.id)
    rooms.find((room) => room.id === id).players.push(player)
    callback(player)
    emitToRoom(id, ioEvents.ADD_PLAYER, player)
  })

  //VOTE
  socket.on(ioEvents.VOTE, (data, callback) => {
    const { roomId, playerId, cardContent } = data
    rooms.find((room) => room.id === roomId).players.find((player) => player.id === playerId).vote = cardContent
    callback(cardContent)
    emitToRoom(roomId, ioEvents.VOTE, data)
  })


  // CHANGE CARDS
  socket.on(ioEvents.CHANGE_CARDS, (data) => {
    const id = data.roomId
    const cards = data.cards
    rooms.find((room) => room.id === id).cards = cards
    rooms.find((room) => room.id === id).players = rooms
      .find((room) => room.id === id)
      .players.map((player) => {
        return { ...player, vote: "none" }
      })
    emitToRoom(id)
  })

  socket.on(ioEvents.CHANGE_TYPE, (data) => {
    const roomId = data.roomId
    const playerId = data.playerId
    const type = data.type
    rooms.find((room) => room.id === roomId).players.find((player) => player.id === playerId).type = type
    emitToRoom(roomId)
  })





  socket.on(ioEvents.RESET, (roomId) => {
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
    emitToRoom(roomId)
    socket.to(roomId).emit("reset")
  })
  socket.on(ioEvents.GIVE_ADMIN, (data) => {
    const id = data.roomId
    const admin = data.admin
    rooms.find((room) => room.id === id).admin = admin
    emitToRoom(id)
  })
  socket.on(ioEvents.REVEAL, (roomId) => {
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
    emitToRoom(roomId)
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
      emitToRoom(roomId)
    }
    console.log("Client disconnected")
  })

  function emitToRoom(roomId, event, data) {
    io.to(roomId).emit(event, data)
  }
})