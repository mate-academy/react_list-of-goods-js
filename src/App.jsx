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
  const [sortType, setSortType] = useState('');

  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = [...goodsFromServer];

  if (sortType === 'alphabet') {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortType === 'length') {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  const isResetVisible = sortType !== '' || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={() => setSortType('alphabet')}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={() => setSortType('length')}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {isResetVisible && (
          <button
            type="button"
            className="button"
            onClick={() => {
              setSortType('');
              setIsReversed(false);
            }}
          >
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
