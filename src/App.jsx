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

const SORT_ALPHABETICALLY_VALUE = 'Sort alphabetically';
const SORT_BY_LENGTH_VALUE = 'Sort by length';
const RESET_VALUE = 'Reset';
const REVERSE_VALUE = 'Reverse';

function getPreparedGoods(goods, sortKey, isReversed) {
  const tempGoods = [...goods];

  if (sortKey) {
    tempGoods.sort((goodA, goodB) => {
      switch (sortKey) {
        case SORT_ALPHABETICALLY_VALUE:
          return goodA.localeCompare(goodB);

        case SORT_BY_LENGTH_VALUE:
          return goodA.length - goodB.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    tempGoods.reverse();
  }

  return tempGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = getPreparedGoods(
    goodsFromServer, sortType, isReversed,
  );

  const handleClearButtonClick = () => {
    setSortType('');
    setIsReversed(isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            {
              'is-light': sortType !== SORT_ALPHABETICALLY_VALUE,
            },
          )}
          onClick={() => {
            setSortType(SORT_ALPHABETICALLY_VALUE);
          }}
        >
          {SORT_ALPHABETICALLY_VALUE}
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SORT_BY_LENGTH_VALUE,
          })}
          onClick={() => {
            setSortType(SORT_BY_LENGTH_VALUE);
          }}
        >
          {SORT_BY_LENGTH_VALUE}
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          {REVERSE_VALUE}
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleClearButtonClick}
          >
            {RESET_VALUE}
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
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
