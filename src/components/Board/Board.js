import React from 'react';
import styles from './Board.module.css';
import { range } from '../../utils.js';

function Board({ numRows, numCols, children: ChildComponent }) {
  const [isXNext, setIsXNext] = React.useState(true);
  const [squares, setSquares] = React.useState(Array(9).fill(null));

  function handleClick(index) {
    // Return early to prevent double click and changing the previous value
    if(squares[index]) return;

    let nextSquares = [...squares];
    
    if(isXNext) {
      nextSquares[index] = 'X';
    } else {
      nextSquares[index] = 'O';
    }

    setIsXNext(!isXNext);
    setSquares(nextSquares);
  }

  return (
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
  );
}

export default Board;
