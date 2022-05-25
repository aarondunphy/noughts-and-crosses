import React, {useState, useEffect} from "react";
import Box from "./Box";

const Board = () => {

  const [user, setUser] = useState("cross")
  const [winner, setWinner] = useState(null)
  const [clicks, setClicks] = useState(0)
  const [game, setGame] = useState({
    box1: null,
    box2: null,
    box3: null,
    box4: null,
    box5: null,
    box6: null,
    box7: null,
    box8: null,
    box9: null,
  })


    const handleClick = (gameIndex) => {
      setClicks(clicks + 1)
      updateGame(gameIndex, user);
      changeUser();
    }

    const isDraw = () => {
      return clicks === 9 && winner === null
    }

    const updateGame = (gameIndex, value) => {
        const gameCopy = {...game};
        gameCopy[gameIndex] = value;
        setGame(gameCopy)
    }

    useEffect(() => {
        checkForWin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },  [game])
    

    const checkForWin = () => {
        checkLine("box1", "box2", "box3");
        checkLine("box1", "box4", "box7");
        checkLine("box1", "box5", "box9");
        checkLine("box2", "box5", "box8");
        checkLine("box4", "box5", "box6");
        checkLine("box7", "box8", "box9");
        checkLine("box3", "box6", "box9");
        checkLine("box3", "box5", "box7");
    }

    const checkLine = (boxIndex1, boxIndex2, boxIndex3) => {
        if(
            game[boxIndex1] === "naught" &&
            game[boxIndex2] === "naught" &&
            game[boxIndex3] === "naught"
        ) {
            setWinner("naught");
        }else if(
            game[boxIndex1] === "cross" &&
            game[boxIndex2] === "cross" &&
            game[boxIndex3] === "cross"
        ) {
            setWinner("cross");
        }
    }

    const changeUser = () => {
      setUser(user === "naught" ? "cross" : "naught")
    }

    const resetGame = () => {
      setUser("cross")
      setWinner(null)
      setClicks(0)
      setGame({
        box1: null,
        box2: null,
        box3: null,
        box4: null,
        box5: null,
        box6: null,
        box7: null,
        box8: null,
        box9: null,
      })
    }

    const gameBoard = Object.keys(game).map((box, index) => 
        <Box
            key={index}
            type={game[box]}
            handleClick={() => handleClick(box)}
            disabled={isDraw() || winner}
        />
    );
    return (
        <div className="board-container">
            <div className="board">
                {gameBoard}
            </div>
            {winner === "cross" &&
                <>
                <h2>Cross Wins! 🎉</h2>
                <button type="button" className="playAgainBtn" onClick={resetGame}>Play Again!</button>
                </>
            }
            {winner === "naught" &&
                <>
                <h2>Naught Wins! 🎉</h2>
                <button type="button" className="playAgainBtn" onClick={resetGame}>Play Again!</button>
                </>
            }
            {isDraw() &&
                <>
                <h2>Draw! 🤷‍♂️</h2>
                <button type="button" className="playAgainBtn" onClick={resetGame}>Play Again!</button>
                </>
            }
        </div>

    );

}

export default Board;