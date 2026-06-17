import { useState } from "react"

import MainLayout from "./layout/MainLayout"
import LoginPage from "./pages/LoginPage"
import "./App.css"

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("token"))
  return (
    <>
      {user ? (
        <MainLayout setUser={setUser} />
      ) : (
        <LoginPage setUser={setUser} />
      )}
    </>
  )
}

export default App
