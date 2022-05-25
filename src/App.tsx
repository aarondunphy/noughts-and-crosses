import React from "react"
import Board from "./Board"
import "./App.css"

const App = (): JSX.Element => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Naughts &amp; Crosses</h1>

        <Board />
      </header>
    </div>
  )
}

export default App
