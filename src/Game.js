import React from "react";
import Board from "./Board";

export default function Game(props) {
  return (
    <h1>Let's play a Tic-Tac-Toe game</h1>
  )
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
