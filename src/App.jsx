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

const SORT_ALPHABETICALLY = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

function getPreparedGoods(goods, sortBy, isReversed) {
  const sortedGoods = [...goods];

  if (sortBy === SORT_ALPHABETICALLY) {
    sortedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortBy === SORT_BY_LENGTH) {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortingMethod, setSortingMethod] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortingMethod,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortingMethod !== SORT_ALPHABETICALLY,
          })}
          onClick={() => {
            setSortingMethod(SORT_ALPHABETICALLY);
          }}
        >
          {SORT_ALPHABETICALLY}
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortingMethod !== SORT_BY_LENGTH,
          })}
          onClick={() => {
            setSortingMethod(SORT_BY_LENGTH);
          }}
        >
          {SORT_BY_LENGTH}
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(isReversed || sortingMethod) && (
          <button
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
            onClick={() => {
              setSortingMethod('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
