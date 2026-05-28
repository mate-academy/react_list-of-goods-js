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

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [reversed, setReversed] = useState(false);

  const visibleGoods = [...goodsFromServer];

  if (sortType === 'alphabet') {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortType === 'length') {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (reversed) {
    visibleGoods.reverse();
  }

  const handleSortAlphabet = () => {
    setSortType('alphabet');
  };

  const handleSortLenght = () => {
    setSortType('length');
  };

  const handleSortReverse = () => {
    setReversed(!reversed);
  };

  const handleReset = () => {
    setSortType('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={handleSortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={handleSortLenght}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={handleSortReverse}
        >
          Reverse
        </button>

        {(sortType || reversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
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
