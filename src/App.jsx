import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [typeSort, setTypeSort] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const applySort = type => {
    const sorted = [...goodsFromServer];

    if (type === 'alphabet') {
      sorted.sort((a, b) => a.localeCompare(b));
    }

    if (type === 'length') {
      sorted.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sorted.reverse();
    }

    setGoods(sorted);
    setTypeSort(type);
  };

  const toggleReverse = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setGoods(goodsFromServer);
    setTypeSort(null);
    setIsReversed(false);
  };

  const isResetVisible = typeSort !== null || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${typeSort !== 'alphabet' ? 'is-light' : ''}`}
          onClick={() => applySort('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${typeSort !== 'length' ? 'is-light' : ''}`}
          onClick={() => applySort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button type="button" className="button is-danger" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
