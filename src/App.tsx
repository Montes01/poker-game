import { Route, Routes } from 'react-router-dom'
import Splash from './components/pages/Splash'
import Home from './components/pages/Home.'
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/home" Component={Home} />
        <Route path="/" Component={Splash} />
      </Routes>
    </>
  )
}
