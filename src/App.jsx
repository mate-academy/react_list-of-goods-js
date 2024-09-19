import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

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

const ALPHABET_SORT = 'alphabetically';
const LENGTH_SORT = 'byLength';

const getSorted = (goods, sortField, isReversed) => {
  let preparedGoods = [...goods];

  preparedGoods = preparedGoods.sort((good1, good2) => {
    switch (sortField) {
      case ALPHABET_SORT:
        return good1.localeCompare(good2);

      case LENGTH_SORT:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoods = getSorted(goodsFromServer, sortType, isReversed);
  const isResettable = sortType || isReversed;

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== ALPHABET_SORT,
          })}
          onClick={() => {
            setSortType(ALPHABET_SORT);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== LENGTH_SORT,
          })}
          onClick={() => {
            setSortType(LENGTH_SORT);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {isResettable && (
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
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
