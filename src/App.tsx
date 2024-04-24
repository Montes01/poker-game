import { Route, Routes } from "react-router-dom"
import Splash from "./pages/Splash"
import Home from "./pages/Home."
import Room from "./pages/Room"
import { Amplify } from "aws-amplify"
import config from "./aws-exports.js" 
import { useEffect, useState } from "react"
Amplify.configure(config)
export default function App() {
  const [isLogged, setIsLogged] = useState(false)
  useEffect(() => {
    
  }, [])
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
