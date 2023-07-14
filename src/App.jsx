import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
import { GoodsList } from './components/GoodsList';

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

const SORT_BY_NAME = 'name';
const SORT_BY_LENGTH = 'length';

const compareGoods = (good1, good2, orderBy) => {
  switch (orderBy) {
    case SORT_BY_NAME:
      return good1.localeCompare(good2);

    case SORT_BY_LENGTH:
      return good1.length - good2.length;

    default:
      return 0;
  }
};

const getPreparedGoods = (goods, { sortBy, query, isReversed }) => {
  const filtered = query
    ? goods.filter(good => good.include(query))
    : [...goods];

  const sorted = sortBy
    ? filtered.sort((good1, good2) => compareGoods(good1, good2, sortBy))
    : filtered;

  return isReversed
    ? sorted.reverse()
    : sorted;
};

export const App = () => {
  const [sortBy, setSortBy] = useState(null);
  const [isReversed, setIsReversed] = useState(false);
  const isSortedOrIsReversed = sortBy !== null || isReversed;
  const reset = () => {
    setSortBy(null);
    setIsReversed(false);
  };

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortBy,
      query: null,
      isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortBy !== SORT_BY_NAME })}
          onClick={() => setSortBy(SORT_BY_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortBy !== SORT_BY_LENGTH })}
          onClick={() => setSortBy(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isSortedOrIsReversed
          && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
          )}
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
