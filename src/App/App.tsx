import React from "react"
import "./App.css"
import AppProvider from "./AppProvider"
import GameContainer from "../GameContainer"

const App = (): JSX.Element => {
  return (
    <div className="App">
      <AppProvider>
        <GameContainer />
      </AppProvider>
    </div>
  )
}

export default App
