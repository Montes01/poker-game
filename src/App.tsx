import { Route, Routes } from 'react-router-dom'
import Splash from './components/pages/Splash'
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Splash} />
      </Routes>
    </>
  )
}
