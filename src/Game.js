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
