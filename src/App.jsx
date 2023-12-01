import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

const SORT_BY = {
  alphabet: 'alphabet',
  length: 'length',
};

function sortGoods(goods, sortBy) {
  const goodsToSort = [...goods];

  switch (sortBy) {
    case SORT_BY.alphabet:
      return goodsToSort
        .sort((item1, item2) => item1.localeCompare(item2));

    case SORT_BY.length:
      return goodsToSort
        .sort((item1, item2) => item1.length - item2.length);

    default:
      return goodsToSort;
  }
}

export const App = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const goodToRender = sortGoods(goodsFromServer, sortBy);

  if (isReversed) {
    goodToRender.reverse();
  }

  const reset = () => {
    setIsReversed(false);
    setSortBy('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sortBy !== SORT_BY.alphabet })
          }
          onClick={() => setSortBy(SORT_BY.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sortBy !== SORT_BY.length })
          }
          onClick={() => setSortBy(SORT_BY.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning',
            { 'is-light': !isReversed })
          }
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {goodToRender.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
