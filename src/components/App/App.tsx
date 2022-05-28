import React from "react"
import "./App.css"
import GameProvider from "../../providers/GameProvider"
import GameContainer from "../GameContainer"

const App = (): JSX.Element => {
  return (
    <div className="App">
      <GameProvider>
        <GameContainer />
      </GameProvider>
    </div>
  )
}

export default App
