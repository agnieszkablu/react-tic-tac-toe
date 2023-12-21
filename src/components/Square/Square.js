import styles from './Square.module.css';

function Square({value, onSquareClick}) {

  return (
    <button
      id={crypto.randomUUID()}
      onClick={onSquareClick}
      type='button'
      className={styles.square}
      value={value}
    >
      {value}
    </button>
  );
}

export default Square;
