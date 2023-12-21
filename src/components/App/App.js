import logo from '../../assets/logo.svg';
import styles from './App.module.css';
import Game from '../Game';

function App() {
  //Tic Tac Toe game based on the tutorial https://react.dev/learn/tutorial-tic-tac-toe#setup-for-the-tutorial
  return (
    <div>
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt='logo' />
        <h1>Tic Tac Toe</h1>
        <ul>
          <li>Lets you play tic-tac-toe,</li>
          <li>Indicates when a player has won the game,</li>
          <li>Stores a game's history as a game progresses,</li>
          <li>
            Allows players to review a game's history and see previous versions
            of a game's board.
          </li>
        </ul>
        <Game />
      </header>
    </div>
  );
}

export default App;
