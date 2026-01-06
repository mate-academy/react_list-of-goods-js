import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_CASE_ALPHABET = 'alphabet';
const SORT_CASE_LENGTH = 'length';

function getPreparedGoods(goods, { sortCase, isReversed }) {
  const preparedGoods = [...goods];

  if (sortCase === SORT_CASE_ALPHABET) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortCase === SORT_CASE_LENGTH) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortCase, setSortCase] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortCase,
    isReversed,
  });

  const sortByAlphabet = () => {
    setSortCase(SORT_CASE_ALPHABET);
  };

  const sortByLength = () => {
    setSortCase(SORT_CASE_LENGTH);
  };

  const toggleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const reset = () => {
    setSortCase('');
    setIsReversed(false);
  };

  const isInitialOrder = sortCase === '' && isReversed === false;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAlphabet}
          type="button"
          className={`button is-info ${sortCase === SORT_CASE_ALPHABET ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={`button is-success ${sortCase === SORT_CASE_LENGTH ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={toggleReverse}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button onClick={reset} type="button" className="button is-danger">
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
