import { useState } from 'react';
import classNames from 'classnames';
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

export const SORT_BY = {
  NONE: '',
  NAME: 'name',
  LENGTH: 'length',
};

const getPreparedGoods = (goods, { sortBy, isReversed }) => {
  const preparedGoods = [...goods];

  if (sortBy === SORT_BY.NAME) {
    preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
  } else if (sortBy === SORT_BY.LENGTH) {
    preparedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortBy, setSortBy] = useState(SORT_BY.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortBy,
    isReversed,
  });

  const resetState = () => {
    setSortBy(SORT_BY.NONE);
    setIsReversed(false);
  };

  const isModified = sortBy !== SORT_BY.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortBy !== SORT_BY.NAME,
          })}
          onClick={() => setSortBy(SORT_BY.NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortBy !== SORT_BY.LENGTH,
          })}
          onClick={() => setSortBy(SORT_BY.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetState}
          >
            Reset
          </button>
        )}
      </div>

      <ul aria-label="List of goods">
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
