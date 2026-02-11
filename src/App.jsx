import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

const goodsFromServer = [
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

  let preparedGoods = [...goodsFromServer];

  if (sortType === 'alphabet') {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === 'length') {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  const isDefault =
    sortType === '' && isReversed === false;

  const handleSortAlphabetically = () => {
    setSortType('alphabet');
  };

  const handleSortByLength = () => {
    setSortType('length');
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">

        <button
          type="button"
          className={`button ${
            sortType === 'alphabet' ? '' : 'is-light'
          }`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button ${
            sortType === 'length' ? '' : 'is-light'
          }`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button ${
            isReversed ? '' : 'is-light'
          }`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isDefault && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
