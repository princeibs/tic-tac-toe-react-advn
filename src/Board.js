import React from "react";
import Square from "./Square";

export default function Board(props) {
  function renderSquare(i) {
    return <Square
      value={props.squares[i]}
      onClick={() => props.onClick(i)}
      className={props.winningSquares?.includes(i) ? "square winning-square" : "square"} />;
  }  
    return (
      <div className="board">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    );
}
