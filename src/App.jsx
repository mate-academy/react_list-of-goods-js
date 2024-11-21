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

const SORT_FIELD = {
  name: 'name',
  length: 'length',
  none: 'none',
};

function getPreparedGoods(goods, sortField, isReversed) {
  const preparedGoods = [...goods];

  if (sortField !== SORT_FIELD.none) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD.name:
          return good1.localeCompare(good2);
        case SORT_FIELD.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SORT_FIELD.none);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);
  const shouldShowResetButton = sortField !== SORT_FIELD.none || isReversed;

  const handleReset = () => {
    setSortField(SORT_FIELD.none);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SORT_FIELD.name,
          })}
          onClick={() => setSortField(SORT_FIELD.name)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SORT_FIELD.length,
          })}
          onClick={() => setSortField(SORT_FIELD.length)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prevReversed => !prevReversed)}
        >
          Reverse
        </button>
        {shouldShowResetButton && (
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
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
