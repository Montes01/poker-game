import { io } from "socket.io-client"
import { Card } from "./declarations"
import { generateCards } from "./utils"

export const COMPANY_NAME = "pragma"

export const serverPath = "http://localhost:3000"

export const cards: Card[] = generateCards("normal")

export const connection = io("http://localhost:3000")
