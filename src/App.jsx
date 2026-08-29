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

  const handleSortAlphabetically = () => {
    setSortType('alphabet');
  };

  const handleSortByLength = () => {
    setSortType('length');
  };

  const handleToggleReverse = () => {
    setIsReversed((prev) => !prev);
  };

  const handleReset = () => {
    setSortType('');
    setIsReversed(false);
  };

  const getProcessedGoods = () => {
    const list = [...goodsFromServer];

    if (sortType === 'alphabet') {
      list.sort((a, b) => a.localeCompare(b));
    } else if (sortType === 'length') {
      list.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      list.reverse();
    }

    return list;
  };

  const processedGoods = getProcessedGoods();
  const isModified = sortType !== '' || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleToggleReverse}
        >
          Reverse
        </button>

        {isModified && (
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
        {processedGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};