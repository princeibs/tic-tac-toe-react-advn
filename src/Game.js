import React from "react";
import Board from "./Board";

export default class Game extends React.Component {
  render() {
    return (
      <div class="game">
        <Board />
        <div class="control-panel">
          <div class="status">Winner: X</div>
          <div class="moves">
            <button>Go to #1</button>
            <button>Go to #2</button>
            <button>Go to #3</button>
            <button>Go to #4</button>
          </div>
        </div>
      </div>
    );
  }
}

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
      return squares[a];
    }
  }
  return null;
}
