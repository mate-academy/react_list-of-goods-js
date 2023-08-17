import { useState } from 'react';
import cn from 'classnames';

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
  const visibleGoods = [...goodsFromServer];

  const [sortBy, setSortBy] = useState('');
  const [reverse, setReverse] = useState(false);

  const SORT_BY_ALPH = 'alph';
  const SORT_BY_LENGTH = 'length';

  switch (sortBy) {
    case SORT_BY_ALPH:
      if (reverse) {
        visibleGoods
          .sort((good1, good2) => good1.localeCompare(good2)).reverse();
      } else {
        visibleGoods
          .sort((good1, good2) => good1.localeCompare(good2));
      }

      break;

    case SORT_BY_LENGTH:
      if (reverse) {
        visibleGoods
          .sort((good1, good2) => good1.length - good2.length).reverse();
      } else {
        visibleGoods
          .sort((good1, good2) => good1.length - good2.length);
      }

      break;
    default:
      if (reverse) {
        visibleGoods.reverse();
      }

      break;
  }

  const reset = () => {
    setSortBy('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortBy !== SORT_BY_ALPH })}
          onClick={() => setSortBy(SORT_BY_ALPH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortBy !== SORT_BY_LENGTH })}
          onClick={() => setSortBy(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': !reverse })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {sortBy || reverse ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        ) : null}

      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
