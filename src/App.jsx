import 'bulma/css/bulma.css';
import { useState } from 'react';
import cn from 'classnames';
import './App.scss';

const SORT = {
  ALPHABETICALLY: 'Sort alphabetically',
  BY_LENGTH: 'Sort by length',
  NONE: 'none',
};

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
  const [sortField, setSortField] = useState(SORT.NONE);
  const [toReverse, setToReverse] = useState(false);

  const getPreparedGoods = (goods, { sortField:
     field, toReverse: isReversed }) => {
    const preparedGoods = [...goods];

    if (field !== SORT.NONE) {
      preparedGoods.sort((good1, good2) => {
        switch (field) {
          case SORT.ALPHABETICALLY:
            return good1.localeCompare(good2);

          case SORT.BY_LENGTH:
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
  };

  const handleSort = field => () => {
    setSortField(field);
  };

  const handleReset = () => {
    setSortField(SORT.NONE);
    setToReverse(false);
  };

  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortField, toReverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSort(SORT.ALPHABETICALLY)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT.ALPHABETICALLY,
          })}
        >
          {SORT.ALPHABETICALLY}
        </button>

        <button
          onClick={handleSort(SORT.BY_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT.BY_LENGTH,
          })}
        >
          {SORT.BY_LENGTH}
        </button>

        <button
          onClick={() => setToReverse(!toReverse)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !toReverse,
          })}
        >
          Reverse
        </button>

        {(sortField !== SORT.NONE || toReverse) && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (<li data-cy="Good" key={good}>{good}</li>))}
      </ul>
    </div>
  );
};
