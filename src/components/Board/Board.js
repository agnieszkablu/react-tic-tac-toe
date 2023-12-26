import React from 'react';
import styles from './Board.module.css';
import { range } from '../../utils.js';

function Board({
  numRows,
  numCols,
  children: ChildComponent,
  squares,
  isXNext,
  winner,
  onPlay,
}) {
  //handleClick for the main game functionality
  function handleClick(index) {
    // Return early to prevent double click and changing the previous value
    if ((winner && winner[0]) || squares[index]) return;

    let nextSquares = [...squares];

    if (isXNext) {
      nextSquares[index] = 'X';
    } else {
      nextSquares[index] = 'O';
    }

    onPlay(nextSquares);
  }

  return (
    <>
      <div className='grid'>
        {range(numRows).map((rowIndex) => (
          <div key={rowIndex} className={`row ${styles.board}`}>
            {range(numCols).map((colIndex) => {
              const cellIndex = rowIndex * numCols + colIndex;
              let winnerElemClassName = '';

              if (winner && winner[1]) {
                winner[1].map((element) => {
                  //check if the element cellIndex is inside the winner array and return the classname
                  if (element === cellIndex) {
                    winnerElemClassName = 'is-success';
                  }
                  return null;
                });
              }

              return (
                <div key={`${rowIndex}-${colIndex}`} className='cell'>
                  {/* children: ChildComponent -> children passed to the Board become ChildComponent */}
                  <ChildComponent
                    key={`${rowIndex}-${colIndex}`}
                    value={squares[cellIndex]}
                    hasWinnerClassName={winnerElemClassName}
                    onSquareClick={() => {
                      handleClick(cellIndex);
                    }}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default Board;
