import React from "react";
import Board from "./Board";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      stepNumber: 0,
      gameMode: "multi",
      gameStatus: "ongoing",
      locationHistory: [],
      winningSquares: [],
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
    };
  }

  secondPlayer(squares) {
      const freeSquares = [];
      for (let i = 0; i < squares?.length; i++) {
        if (!squares[i]) {
          freeSquares.push(i);
        }
      }
      
      const choice = freeSquares[Math.floor(Math.random() * freeSquares.length)];
      this.setState({       
        xIsNext: false,     
      });
      this.play(choice)        
  }

  handleClick(i) {
    const squares = this.play(i)
    if (this.state.gameMode === "single") {
      this.secondPlayer(squares);
    }

  }

  play(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);
    if (winner || squares[i]) {
      this.setState({
        winningSquares: winner?.winningSquares,
      });
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares: squares }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      locationHistory: this.state.locationHistory.concat(i),
    });
   return squares;
  }

  jumpTo(step) {
    if (
      window.confirm(
        `Are you sure you want to travel back? \nYou can't undo this action`
      )
    ) {
      this.setState({
        winningSquares: [],
        stepNumber: step,
        xIsNext: step % 2 === 0,
        locationHistory: this.state.locationHistory.slice(0, step),
        history: this.state.history.slice(0, step + 1),
      });
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const statusStyle = () => {
      const gameStatus = this.state.gameStatus;
      return (
        "status " +
        (gameStatus === "ongoing" ? "" : gameStatus === "win" ? "win" : "draw")
      );
    };

    const handleChangeGameMode = (event) => {
      if (
        window.confirm(
          "Are you sure you want to change the game mode? \nThis will erase the current game"
        )
      )
        this.setState({
          gameMode: event.target.value,
          xIsNext: true,
          stepNumber: 0,
          locationHistory: [],
          winningSquares: [],
          history: [
            {
              squares: Array(9).fill(null),
            },
          ],
        });
    };

    const moves = history.map((step, move) => {
      let lastLocation = this.state.locationHistory[move - 1] + 1;
      const desc = move ? "Back to square " + lastLocation : "Back to start";
      return (
        <button
          className={this.state.locationHistory.length === move ? "bold" : ""}
          key={move}
          id={move}
          onClick={() => this.jumpTo(move)}
        >
          {desc}
        </button>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner.winner;
    } else if (!current.squares.includes(null)) {
      status = "Draw";
    } else {
      status = (this.state.xIsNext ? "X" : "O") + " is next";
    }

    return (
      <div>
        <div className="header">Tic-Tac-Toe Game</div>
        <div className="game">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winningSquares={this.state.winningSquares}
          />
          <div className="control-panel">
            <div className={statusStyle()}>{status}</div>
            <div className="moves">{moves}</div>
          </div>
          <div>
            <select
              value={this.state.gameMode}
              onChange={handleChangeGameMode}
              className="drop-down"
            >
              <option className="drop-option" value="multi">
                Single Player
              </option>
              <option className="drop-option" value="single">
                Multi Player
              </option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

// Helper function to calculate result
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      const obj = { winner: squares[a], winningSquares: lines[i] };
      return obj;
    }
  }
  return null;
}
