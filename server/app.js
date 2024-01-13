import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
const app = express()
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

server.listen(process.env.PORT ?? 3000, () => {
  console.log("Server listening on port 3000")
})

io.on("connection", (_) => {
  console.log("New client connected")
})
