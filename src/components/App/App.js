import logo from '../../assets/logo.svg';
import styles from './App.module.css';
import Board from '../Board';
import Square from '../Square';

function App() {
  //Tic Tac Toe game based on the tutorial https://react.dev/learn/tutorial-tic-tac-toe#setup-for-the-tutorial
  return (
    <div>
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt='logo' />
        <h1>Tic Tac Toe</h1>
        <Board numCols={3} numRows={3} children={Square} />
      </header>
    </div>
  );
}

export default App;
