import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Board from "./Board";

export default function Game(props) {
  // state variables
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [gameMode, setGameMode] = useState("multi");
  const [gameStatus, setGameStatus] = useState("ongoing");
  const [locationHistory, setLocationHistory] = useState([]);
  const [winningSquares, setWinningSquares] = useState([]);
  const [gameHistory, setGameHistory] = useState([
    { squares: Array(9).fill(null) },
  ]);
  let statusStyle;

  // function that respond to every square clicked on the board
  function handleClick(i) {
    // Get the current square and check if there is a winner
    const history = gameHistory.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);

    // When there is a winner, or the squares are filled up
    // set the winning square and exit the game
    if (winner) {
      setGameStatus("win");
      setWinningSquares(winner?.winningSquares);
      return;
    
    // When an already occupied square is clicked, do nothing
    } else if (squares[i]) {      
      return;
    }

    // Set the next play and update state variables based on last play
    squares[i] = xIsNext ? "X" : "O";
    setGameHistory(history.concat([{ squares: squares }]));
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
    setLocationHistory(locationHistory.concat(i));
  }

  // Handle multiplayer
  useEffect(() => {
    // When the game mode is set to multiplayer and
    // the first player has played
    if (gameMode === "single" && !xIsNext) {
      const freeSquares = [];
      for (let i = 0; i < current.squares?.length; i++) {
        if (!current.squares[i]) {
          freeSquares.push(i);
        }
      }
      // Select a random square from the list of free squares
      const choice = freeSquares[Math.floor(Math.random() * freeSquares?.length)];  
      setTimeout(handleClick(choice), 3000); // Second player plays      
    }
  }, [xIsNext]); // Only run this function when the current player switches

  // Jump to board `step` in history
  function jumpTo(step) {
    if (
      // Display confirmation message before time travelling
      window.confirm(
        `Are you sure you want to travel back? \nYou can't undo this action`
      )
    ) {
      // Reset state variables after time travel
      setWinningSquares([]);
      setStepNumber(step);
      setXIsNext(step % 2 === 0);
      setLocationHistory(locationHistory.slice(0, step));
      setGameHistory(gameHistory.slice(0, step + 1));
      setGameStatus("ongoing");
    }
  }

  function handleChangeGameMode(event) {
    if (
      // Display confirmation message before switching game mode
      window.confirm(
        "Are you sure you want to change the game mode? \nThis will erase the current game"
      )
    )
      // Reset state variables after changing game mode
      setGameMode(event.target.value);
    setXIsNext(true);
    setStepNumber(0);
    setLocationHistory([]);
    setWinningSquares([]);
    setGameStatus("ongoing");
    setGameHistory([
      {
        squares: Array(9).fill(null),
      },
    ]);
  }

  // Get a history of all the move and return a button with a
  // description for move
  const moves = gameHistory.map((step, move) => {
    let lastLocation = locationHistory[move - 1] + 1;
    const desc = move ? "Back to square " + lastLocation : "Back to start";
    return (
      <button
        className={locationHistory.length === move ? "bold" : ""}
        key={move}
        id={move}
        onClick={() => jumpTo(move)}
      >
        {desc}
      </button>
    );
  });

  const current = gameHistory[stepNumber];
  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
    status = "Winner: " + winner.winner;
  } else if (!current.squares.includes(null)) {
    status = "Draw";
  } else {
    status = (xIsNext ? "X" : "O") + " is next";
  }

  statusStyle = `status ${gameStatus === "win" ?
    "win" :
    gameStatus === "draw" ?
      "draw" :
      ""}`;


  return (
    <div>
      {gameStatus === "win" && <Confetti />}
      <div className="header">Tic-Tac-Toe Game</div>
      <div className="game">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          winningSquares={winningSquares}
        />
        <div className="control-panel">
          <div className={statusStyle}>{status}</div>
          <div className="moves">{moves}</div>
        </div>
        <div>
          <select
            value={gameMode}
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
