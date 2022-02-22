import React from "react";
import Board from "./Board";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      stepNumber: 0,
      locationHistory: [],
      winningSquares: [],
      history: [{
        squares: Array(9).fill(null),
      }]
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares: squares }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      locationHistory: this.state.locationHistory.concat(i),
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      locationHistory: this.state.locationHistory.slice(0, step),
      history: this.state.history.slice(0, step + 1),
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      let lastLocation = (this.state.locationHistory[move - 1] + 1);
      const desc = move ? "Back to square " + lastLocation : "Back to start";
      return (
        <button className={this.state.locationHistory.length === move ? "bold" : ""}
          key={move}
          id={move} onClick={() => this.jumpTo(move)}>
          {desc}
        </button>
      );
    });

    let status;
    if (winner) {
      status = winner.winner + " Won";
      console.log(this.state.winningSquares);
    } else if (!current.squares.includes(null)) {
      status = "Draw";
    } else {
      status = (this.state.xIsNext ? "X" : "O") + " is next";
    }

    return (
      <div className="game">
        <Board
          squares={current.squares}
          onClick={(i) => this.handleClick(i)}
          winningSquares={this.state.winningSquares} />
        <div className="control-panel">
          <div className="status">{status}</div>
          <div className="moves">
            {moves}
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
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      const obj = { winner: squares[a], winningSquares: lines[i] };
      return obj;
    }
  }
  return null;
}
