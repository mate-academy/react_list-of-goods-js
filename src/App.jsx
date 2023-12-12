import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

const SORT_BY_ABT = 'alphabetical';
const SORT_BY_LENGTH = 'length';
const SORT_BY_REVERS = 'reverse';

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

let isSorted = false;

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');

  const sortByAbt = () => {
    setVisibleGoods(
      [...visibleGoods].sort(),
      setSortField(SORT_BY_ABT),
      isSorted = true,
    );
  };

  const sortByLength = () => {
    setVisibleGoods(
      [...visibleGoods].sort((good1, good2) => good1.length - good2.length),
      setSortField(SORT_BY_LENGTH),
      isSorted = true,
    );
  };

  const reverse = () => {
    setVisibleGoods(
      [...visibleGoods].reverse(),
      setSortField(SORT_BY_REVERS),
      isSorted = true,
    );
  };

  const reset = () => {
    setVisibleGoods(goodsFromServer,
      setSortField(null),
      isSorted = false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAbt}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SORT_BY_ABT })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_BY_LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={cn('button is-warning',
            { 'is-light': sortField !== SORT_BY_REVERS })}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map((good, index) => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
