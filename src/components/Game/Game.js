import React from 'react';
import styles from './Game.module.css';
import Board from '../Board';
import Square from '../Square';
import { calculateWinner } from '../../utils.js';

function Game() {
  const [currentMove, setCurrentMove] = React.useState(0);
  const [gameHistory, setGameHistory] = React.useState(
    Array(Array(9).fill(null))
  );
  // this is redundant since we can calculate it from currentMove (if current move is odd its false, if its even its true)
  // const [isXNext, setIsXNext] = React.useState(true);
  const isXNext = currentMove % 2 === 0;
  const currentSquares = gameHistory[currentMove];

  //Find the winner
  const winner = calculateWinner(currentSquares);
  let gameStatus;

  if (winner && winner[0]) {
    gameStatus = 'The winner is: ' + winner[0];
  } else {
    gameStatus = 'Next player is:' + (isXNext ? 'X' : 'O');
  }

  function handlePlay(nextSquares) {
    const nextGameHistory = [
      ...gameHistory.slice(0, currentMove + 1),
      nextSquares,
    ];
    setGameHistory(nextGameHistory);
    setCurrentMove(nextGameHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = gameHistory.map((squares, move) => {
    //move = index
    let description;

    if (move > 0) {
      description = 'Return to move' + move;
    } else {
      description = 'Go to start';
    }

    return (
      <li key={move}>
        <button className={styles.btn} onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <>
      <h2 className={styles.status}>{gameStatus}</h2>
      <div className={`${styles.wrapper} row`}>
        <div className='board'>
          <Board
            numCols={3}
            numRows={3}
            children={Square}
            squares={currentSquares}
            isXNext={isXNext}
            onPlay={handlePlay}
            winner={winner}
          />
        </div>
        <div className='info'>
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}

export default Game;
