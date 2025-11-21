import { BrowserRouter, Route, Routes } from "react-router-dom"
import Feed from "./components/Feed"
import Login from "./components/Login"
import Connections from "./components/Connections"
import Body from "./components/Body"


function App() {
  return (
    <>
        <BrowserRouter basename="/">
            <Routes>
              <Route path ="/" element={<Body/>}>
                <Route path="/" element={<Feed/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/connections" element={<Connections/>}/>
              </Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
