import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      let row = [];
      for (let i = 0; i < ncols; i++) {
        const chance = Math.random();
        row.push(chance <= chanceLightStartsOn ? true : false);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    const hasWon = board.every((val) => val.every((val) => val === true));
    console.log(hasWon);
    return hasWon;
  }

  function flipCellsAround(coord) {
    const [y, x] = coord.split("-").map(Number);
    let newBoard = board.slice();
    const flipCell = (y, x, boardCopy) => {
      // if this coord is actually on board, flip it

      if (x >= 0 && x <= ncols && y >= 0 && y <= nrows) {
        console.log("working");
        for (let i = -1; i <= 1; i++) {
          if (!(y + i < 0 || y + i >= nrows)) {
            console.log(y + i);
            boardCopy[y + i][x] = !boardCopy[y + i][x];
          }
          if (!(x + i < 0 || x + i >= ncols)) {
            boardCopy[y][x + i] = !boardCopy[y][x + i];
          }
        }
        boardCopy[y][x] = !boardCopy[y][x];
      }
      return boardCopy;
    };
    setBoard(flipCell(y, x, newBoard));

    // TODO: Make a (deep) copy of the oldBoard

    // TODO: in the copy, flip this cell and the cells around it

    // TODO: return the copy
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  return (
    <div>
      {hasWon() ? (
        <h1>You Won!</h1>
      ) : (
        <table>
          <tbody>
            {board.map((row, y) => (
              <tr>
                {row.map((cell, x) => (
                  <Cell
                    isLit={cell}
                    flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  // TODO
}

export default Board;
