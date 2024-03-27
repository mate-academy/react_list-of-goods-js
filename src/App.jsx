import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

const SORT_ALPHABETICALLY = 'alphabetically';
const SORT_BY_LENGTH = 'length';

export const App = () => {
  const [sortBy, setSortBy] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const handleSortAlphabetically = () => {
    setSortBy(SORT_ALPHABETICALLY);
    setIsReversed(false);
  };

  const handleSortByLength = () => {
    setSortBy(SORT_BY_LENGTH);
    setIsReversed(false);
  };

  const handleReverseOrder = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortBy(null);
    setIsReversed(false);
  };

  const sortedGoods = [...goodsFromServer];

  if (sortBy === SORT_ALPHABETICALLY) {
    sortedGoods.sort();
  } else if (sortBy === SORT_BY_LENGTH) {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortBy !== SORT_ALPHABETICALLY,
          })}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortBy !== SORT_BY_LENGTH,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverseOrder}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
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
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
