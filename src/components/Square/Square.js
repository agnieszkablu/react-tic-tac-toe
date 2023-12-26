import styles from './Square.module.css';

function Square({ value, hasWinnerClassName, onSquareClick }) {
  let classList = hasWinnerClassName ? styles.success : '';

  return (
    <button
      id={crypto.randomUUID()}
      onClick={onSquareClick}
      type='button'
      className={styles.square + ' ' + classList}
      value={value}
    >
      {value}
    </button>
  );
}

export default Square;
