import React from "react";
import Box from "./Box";

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "cross",
            winner: null,
            clicks: 0,
            game: {
                box1: null,
                box2: null,
                box3: null,
                box4: null,
                box5: null,
                box6: null,
                box7: null,
                box8: null,
                box9: null,
            },
        };
    }

    handleClick = (gameIndex) => {
        const user = this.state.user;
        this.updateGame(gameIndex, user);
        this.changeUser();
        
    }

    updateGame(gameIndex, value) {
        const game = this.state.game;
        game[gameIndex] = value;
        this.setState({
            game: game,
        }, () => {
            this.checkForWin();
        });
    }

    checkForDraw() {
        const game = this.state.game;
        if(Object.values(game).includes(null) === false) {
            if(this.state.winner === null) {
                this.setState({
                    winner: "draw",
                });
            }
        }
    }

    checkForWin() {
        const clicks = this.state.clicks;
        this.setState({clicks: clicks + 1});
        this.checkLine("box1", "box2", "box3");
        this.checkLine("box1", "box4", "box7");
        this.checkLine("box1", "box5", "box9");
        this.checkLine("box2", "box5", "box8");
        this.checkLine("box4", "box5", "box6");
        this.checkLine("box7", "box8", "box9");
        this.checkLine("box3", "box6", "box9");
        this.checkLine("box3", "box5", "box7");
    }

    checkLine(boxIndex1, boxIndex2, boxIndex3) {
        if(
            this.state.game[boxIndex1] === "naught" &&
            this.state.game[boxIndex2] === "naught" &&
            this.state.game[boxIndex3] === "naught"
        ) {
            this.setState({winner: "naught"});
        }else if(
            this.state.game[boxIndex1] === "cross" &&
            this.state.game[boxIndex2] === "cross" &&
            this.state.game[boxIndex3] === "cross"
        ) {
            this.setState({winner: "cross"});
        }
    }

    changeUser() {
        const user = this.state.user;
        this.setState({
            user: user === "naught" ? "cross" : "naught",
        })
    }

    resetGame() {
        this.setState({
            user: "cross",
            winner: null,
            clicks: 0,
            game: {
                box1: null,
                box2: null,
                box3: null,
                box4: null,
                box5: null,
                box6: null,
                box7: null,
                box8: null,
                box9: null,
            },
        });
    }

    render() {
        const game = Object.keys(this.state.game).map((box, index) => 
            <Box
                key={index}
                type={this.state.game[box]}
                onClick={this.handleClick.bind(this, box)}
            />
        );
        return (
            <div>
                <div className="board">
                    {game}
                </div>
                {this.state.winner === "cross" &&
                    <>
                    <h2>Cross Wins!</h2>
                    <button type="button" onClick={this.resetGame.bind(this)}>Reset</button>
                    </>
                }
                {this.state.winner === "naught" &&
                    <>
                    <h2>Naught Wins!</h2>
                    <button type="button" onClick={this.resetGame.bind(this)}>Reset</button>
                    </>
                }
                {this.state.clicks === 9 && this.state.winner === null &&
                    <>
                    <h2>Draw!</h2>
                    <button type="button" onClick={this.resetGame.bind(this)}>Reset</button>
                    </>
                }
            </div>

        );
    }

}

export default Board;