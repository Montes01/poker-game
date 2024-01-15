import { Route, Routes } from "react-router-dom"
import Splash from "./pages/Splash"
import Home from "./pages/Home."
import Room from "./pages/Room"
import { io } from "socket.io-client"
export const connection = io("http://localhost:3000")

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/home" Component={Home} />
        <Route path="/" Component={Splash} />
        <Route path="/room/:id" Component={Room} />
      </Routes>
    </>
  )
}
