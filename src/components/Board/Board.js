import React from 'react';
import styles from './Board.module.css';
import { range } from '../../utils.js';

//calculateWinner to show which sign won

function calculateWinner(squares) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [1, 4, 7],
    [0, 3, 6],
    [2, 5, 8],
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board({ numRows, numCols, children: ChildComponent }) {
  const [isXNext, setIsXNext] = React.useState(true);
  const [squares, setSquares] = React.useState(Array(9).fill(null));

  //Find the winner
  const winner = calculateWinner(squares);
  let gameStatus;

  if (winner) {
    gameStatus = 'The winner is: ' + winner;
  } else {
    gameStatus = 'Next player is:' + (isXNext ? 'X' : 'O');
  }

  //handleClick for the main game functionality
  function handleClick(index) {
    // Return early to prevent double click and changing the previous value
    if (squares[index] || calculateWinner(squares)) return;

    let nextSquares = [...squares];

    if (isXNext) {
      nextSquares[index] = 'X';
    } else {
      nextSquares[index] = 'O';
    }

    setIsXNext(!isXNext);
    setSquares(nextSquares);
  }

  return (
    <>
      <h2 className={styles.status}>{gameStatus}</h2>
      <div className='grid'>
        {range(numRows).map((rowIndex) => (
          <div key={rowIndex} className={`row ${styles.board}`}>
            {range(numCols).map((colIndex) => {
              const cellIndex = rowIndex * numCols + colIndex;
              return (
                <div key={`${rowIndex}-${colIndex}`} className='cell'>
                  {/* children: ChildComponent -> children passed to the Board become ChildComponent */}
                  <ChildComponent
                    key={`${rowIndex}-${colIndex}`}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    cellIndex={cellIndex}
                    value={squares[cellIndex]}
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
